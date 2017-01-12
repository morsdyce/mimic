import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import { MockedRequest } from 'api/models/mocked-request';
import { getHeadersObject } from 'api/utils/headers';
import socketCluster from 'socketcluster-client';
import EVENTS from 'api/constants/events';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';

export class Communicator {
  constructor(mode, options) {
    this.isWebWorker = mode === 'worker';
    this.isRemote = mode === 'remote';
    this.mockedRequests = [];
    this.socket = null;
    this.initialized = mode !== 'remote';

    if (this.isWebWorker) {
      this.initWebWorkerListeners();
    }

    if (this.isRemote) {
      this.initRemoteListeners(options);
    }
  }

  initWebWorkerListeners() {
    self.addEventListener('message', (event) => {
      if (event.data.type === EVENTS.MIMIC_SET_DATA) {
        event.stopImmediatePropagation();
        this.mockedRequests = event.data.payload.map((request) => new MockedRequest(request));
      }
    });
  }

  initRemoteListeners(options) {
    const defaultSocketOptions = {
      secure: false,
      hostname: 'localhost',
      port: 5000,
      autoReconnect: true,
      autoReconnectOptions: {
        randomness: 30000
      }
    };

    this.socket = socketCluster.connect(Object.assign({}, defaultSocketOptions, options));

    this.socket.on('error', function (err) {
      console.error('Mimic Remote unable to connect. Please check mimic-remote is running.');
    });

    this.socket.on('connect', () => {
      this.socket.emit('mimic-message', { type: EVENTS.GET_MOCKED_REQUESTS });
    });

    const channel = this.socket.subscribe('mimic-message');

    channel.watch((message) => {
      if (message.type === EVENTS.MIMIC_SET_DATA) {
        Scenarios.setScenarios(message.payload);
        this.initialized = true;
      }
    });

    Emitter.on(EVENTS.MIMIC_WEB_WORKER_CAPTURE, (payload) => {
      this.captureRequest(payload.request, payload.response);
    });
  }

  waitForInit() {
    return new Promise((resolve, reject) => {
      if (this.initialized) {
        return resolve();
      }

      let channel = this.socket.subscribe('mimic-message');

      channel.watch((message) => {
        if (message.type === EVENTS.MIMIC_SET_DATA) {
          this.initialized = true;
          resolve();
        }
      });
    });
  }

  getCurrentMockedRequests() {
    return this.waitForInit()
      .then(() => {
        return new Promise((resolve) => {
          if (!this.isWebWorker) {
            resolve(Scenarios.getCurrentMockedRequests());
          }

          setTimeout(() => resolve(this.mockedRequests), 0);
        });
      });
  }

  captureRequest(request, response) {
    const jsonRequest = {
      method: request.method,
      url: request.url,
      headers: getHeadersObject(request.headers),
      startTime: request.startTime
    };
    const jsonResponse = {
      headers: getHeadersObject(response.headers),
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      data: response.data
    };

    if (this.isWebWorker) {
      self.postMessage({ type: WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_REQUEST, payload: {
        mockId: request.mock ? request.mock.id : null,
        request: jsonRequest,
        response: jsonResponse
      }});
      return;
    }

    if (this.isRemote) {
      this.socket.emit('mimic-message', {
        type: EVENTS.REQUEST_CAPTURED,
        payload: {
          mockId: request.mock ? request.mock.id : null,
          request: jsonRequest,
          response: jsonResponse
        }
      });
      return;
    }

    Requests.capture(request, response);
  }

  emit(event) {
    if (this.isWebWorker) {
      self.postMessage({ type: WORKER_MESSAGE_TYPES.MIMIC_EMIT_EVENT, payload: event });
      return;
    }

    Emitter.emit(event);
  }
}
