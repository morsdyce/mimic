import Emitter from 'api/emitter';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { get } from 'lodash';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';

export function bootstrapWorker(worker, API) {
  worker.addEventListener('message', (event) => {
    const messageType = get(event, 'data.type');

    if (messageType === WORKER_MESSAGE_TYPES.BDSM_CAPTURE_REQUEST) {
      event.stopImmediatePropagation();

      const request = event.data.payload.request;
      const response = event.data.payload.response;
      const mockId = event.data.payload.mockId;

      if (mockId) {
        request.mock = API.mockedRequests.filter((mock) => mock.id === mockId)[0];
      }

      if (API.mode === 'remote') {
        Emitter.emit(EVENTS.BDSM_WEB_WORKER_CAPTURE, { request, response });
      }

      Requests.capture(request, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
    }

    if (messageType === WORKER_MESSAGE_TYPES.BDSM_EMIT_EVENT) {
      event.stopImmediatePropagation();
      Emitter.emit(event.data.payload);
    }
  });

  worker.postMessage({ type: EVENTS.BDSM_SET_DATA, payload: API.mockedRequests });
  API.on(EVENTS.STORAGE_PERSIST, () => worker.postMessage({ type: EVENTS.BDSM_SET_DATA, payload: API.mockedRequests }));
}
