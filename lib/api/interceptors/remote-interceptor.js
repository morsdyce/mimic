import socketCluster from 'socketcluster-client';
import assign from 'lodash/assign';

import WebInterceptor from 'api/interceptors/web-interceptor';
import EVENTS from 'api/constants/events';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import { normalizeFormData } from 'api/utils/form-data';

import { getJSONRequest, getJSONResponse } from 'api/utils/normalization';

class RemoteInterceptor extends WebInterceptor {
  constructor(options) {
    super();

    this.socket = null;
    this.initRemoteListeners(options);
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

    this.socket = socketCluster.connect(assign({}, defaultSocketOptions, options));

    this.socket.on('error', function (err) {
      console.error('Mimic Remote unable to connect. Please check mimic-remote is running.');
    });

    this.socket.on('connect', () => {
      this.socket.emit('mimic-message', { type: EVENTS.GET_MOCKED_REQUESTS });
    });

    const channel = this.socket.subscribe('mimic-message');

    channel.watch((message) => {
      if (message.type === EVENTS.MIMIC_SET_DATA) {
        Mocks.setMocks(message.payload.mocks);
        Groups.setGroups(message.payload.groups);
        this.initialized = true;
      }
    });
  }

  capturePendingRequest(request) {
    const normalizedRequest = normalizeFormData(request);
    this.socket.emit('mimic-message', {
      type: EVENTS.PENDING_REQUEST_CAPTURED,
      payload: {
        request: getJSONRequest(normalizedRequest)
      }
    });
  }

  setRequestMock(id, mock) {
    this.socket.emit('mimic-message', {
      type: EVENTS.SET_REQUEST_MOCK,
      payload: {
        requestId: id,
        mock
      }
    });
  }

  updateCapturedRequest(request, response) {
    this.socket.emit('mimic-message', {
      type: EVENTS.SET_RESPONSE,
      payload: {
        request: getJSONRequest(request),
        response: getJSONResponse(response)
      }
    });
  }

  getMocks() {
    return this.waitForInit()
      .then(() => Mocks.all);
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
}

export default RemoteInterceptor;