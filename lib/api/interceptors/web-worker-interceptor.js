import get from 'lodash/get';

import Emitter from 'api/emitter';
import WebInterceptor from 'api/interceptors/web-interceptor';
import EVENTS from 'api/constants/events';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';
import { getHeadersObject } from 'api/utils/headers';
import { Mock } from 'api/models/mock';

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

class WebWorkerInterceptor extends WebInterceptor {
  constructor() {
    super();

    this.mocks = [];
    this.initWebWorkerListeners();
  }

  initWebWorkerListeners() {
    self.addEventListener('message', (event) => {
      if (event.data.type === EVENTS.MIMIC_SET_DATA) {
        event.stopImmediatePropagation();
        this.mocks = event.data.payload.map((request) => new Mock(request));
        this.initialized = true;
      }
    });
  }

  capturePendingRequest(request) {
    self.postMessage({
      type: WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_PENDING_REQUEST,
      payload: {
        request: getJSONRequest(request)
      }
    });
  }

  setRequestMock(id, mock) {
    // not needed in web workers
  }

  updateCapturedRequest(request, response) {
    self.postMessage({
      type: WORKER_MESSAGE_TYPES.MIMIC_SET_RESPONSE,
      payload: {
        request: getJSONRequest(request),
        response: getJSONResponse(response)
      }
    });
  }

  getMocks() {
    return this.waitForInit()
      .then(() => this.mocks);
  }

  waitForInit() {
    return new Promise((resolve, reject) => {
      if (this.initialized) {
        return resolve();
      }

      Emitter.on(EVENTS.STORAGE_READY, () => {
        this.initialized = true;
        resolve();
      });

      return;
    });
  }
}

export default WebWorkerInterceptor;