import socketCluster from 'socketcluster-client';
import assign from 'lodash/assign';
import isObject from 'lodash/isObject';

import WebInterceptor from 'api/interceptors/web-interceptor';
import EVENTS from 'api/constants/events';
import Mocks from 'api/mocks';
import Groups from 'api/groups';

import get from 'lodash/get';
import { getHeadersObject } from 'api/utils/headers';

const getJSONRequest = (request) => ({
  id: request.id,
  method: request.method,
  url: request.url,
  body: request.body,
  headers: getHeadersObject(request.headers),
  startTime: request.startTime,
  origin: typeof window !== "undefined" ? window.location.origin : null
});

const getJSONResponse = (response) =>({
  headers: getHeadersObject(response.headers),
  status: response.status,
  statusText: response.statusText,
  url: response.url,
  data: get(global, 'isNativeScript') && isObject(response.data) ? JSON.stringify(response.data) : response.data
});

class RemoteInterceptor extends WebInterceptor {
  constructor(options) {
    super();

    this.socket = null;
    this.initRemoteListeners(options);

    // initialize the interceptor with the correct context
    this.init(this);
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
    this.socket.emit('mimic-message', {
      type: EVENTS.PENDING_REQUEST_CAPTURED,
      payload: {
        request: getJSONRequest(request)
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