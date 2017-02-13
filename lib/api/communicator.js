import Emitter from 'api/emitter';
import Mocks from 'api/mocks';
import Requests from 'api/requests';
import { Mock } from 'api/models/mock';
import { getHeadersObject } from 'api/utils/headers';
import socketCluster from 'socketcluster-client';
import EVENTS from 'api/constants/events';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';

export class Communicator {
  constructor(mode, options) {
    this.isWebWorker = mode === 'worker';
    this.isRemote = mode === 'remote';
    this.mocks = [];
    this.socket = null;
    this.initialized = mode === 'worker';

    if (this.isWebWorker) {
      this.initWebWorkerListeners();
    } else if (this.isRemote) {
      this.initRemoteListeners(options);
    } else {
      Emitter.on(EVENTS.STORAGE_READY, () => {
        this.initialized = true;
      });
    }
  }

  initWebWorkerListeners() {
    self.addEventListener('message', (event) => {
      if (event.data.type === EVENTS.MIMIC_SET_DATA) {
        event.stopImmediatePropagation();
        this.mocks = event.data.payload.map((request) => new Mock(request));
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
        Mocks.setMocks(message.payload);
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

      if (!this.isRemote) {
        Emitter.on(EVENTS.STORAGE_READY, () => {
          this.initialized = true;
          resolve();
        });

        return;
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

  getActiveMocks() {
    return this.waitForInit()
      .then(() => {
        return new Promise((resolve) => {
          if (!this.isWebWorker) {
            resolve(Mocks.findAll({ active: true }));
          }

          setTimeout(() => resolve(this.mocks), 0);
        });
      });
  }

  capturePendingRequest(request) {
    const origin = typeof window !== "undefined" ? window.location.origin : null;

    const jsonRequest = {
      method: request.method,
      url: request.url,
      headers: getHeadersObject(request.headers),
      startTime: request.startTime,
      origin
    };

    if (this.isWebWorker) {
      self.postMessage({ type: WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_REQUEST, payload: {
        mockId: request.mock ? request.mock.id : null,
        request: jsonRequest
      }});
      return;
    }

    if (this.isRemote) {
      this.socket.emit('mimic-message', {
        type: EVENTS.REQUEST_CAPTURED,
        payload: {
          mockId: request.mock ? request.mock.id : null,
          request: jsonRequest
        }
      });
      return;
    }

    request.origin = origin;

    Requests.capturePending(request);
  }

  setCapturedRequestResponse(request, response) {
    const origin = typeof window !== "undefined" ? window.location.origin : null;

    const jsonRequest = {
      method: request.method,
      url: request.url,
      headers: getHeadersObject(request.headers),
      startTime: request.startTime,
      origin
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
          response: jsonResponse
        }
      });
      return;
    }

    Requests.setResponse(request.id, response, request.startTime);
  }

  setRequestMock(requestId, mockId) {
    Requests.setMock(requestId, mockId);
  }

  captureRequest(request, response) {
    const origin = typeof window !== "undefined" ? window.location.origin : null;

    const jsonRequest = {
      method: request.method,
      url: request.url,
      headers: getHeadersObject(request.headers),
      startTime: request.startTime,
      origin
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

    request.origin = origin;

    Requests.capture(request, response);
  }

  emit(event, ...args) {
    if (this.isWebWorker) {
      self.postMessage({ type: WORKER_MESSAGE_TYPES.MIMIC_EMIT_EVENT, payload: event });
      return;
    }

    Emitter.emit(event, ...args);
  }
}
