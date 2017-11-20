import Emitter from 'api/emitter';
import WebInterceptor from 'api/interceptors/web-interceptor';
import EVENTS from 'api/constants/events';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';
import { getJSONRequest, getJSONResponse } from 'api/utils/normalization';
import { Mock } from 'api/models/mock';
import { normalizeFormData } from 'api/utils/form-data';

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
    const normalizedRequest = normalizeFormData(request);
    self.postMessage({
      type: WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_PENDING_REQUEST,
      payload: {
        request: getJSONRequest(normalizedRequest)
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