import Emitter from 'api/emitter';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { get } from 'lodash';
import WORKER_MESSAGE_TYPES from 'api/constants/worker-message-types';

export function bootstrapWorker(worker, API, isEnabled) {
  worker.addEventListener('message', (event) => {
    const messageType = get(event, 'data.type');

    if (messageType === WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_PENDING_REQUEST) {
      event.stopImmediatePropagation();

      const { request } = event.data.payload;

      if (API.mode === 'remote') {
        Emitter.emit(EVENTS.MIMIC_WEB_WORKER_CAPTURE, { request });
      }

      Requests.capturePending(request);
      Emitter.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
    }


    if (messageType === WORKER_MESSAGE_TYPES.MIMIC_SET_RESPONSE) {
      event.stopImmediatePropagation();

      const { request, response } = event.data.payload;

      if (API.mode === 'remote') {
        Emitter.emit(EVENTS.MIMIC_WEB_WORKER_CAPTURE, { request, response });
      }

      Requests.setResponse(request.id, response, request.startTime);
      Emitter.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
    }


    if (messageType === WORKER_MESSAGE_TYPES.MIMIC_CAPTURE_REQUEST) {
      event.stopImmediatePropagation();

      const { request, response, mockId } = event.data.payload;

      if (mockId) {
        request.mock = API.mocks.filter((mock) => mock.id === mockId)[0];
      }

      if (API.mode === 'remote') {
        Emitter.emit(EVENTS.MIMIC_WEB_WORKER_CAPTURE, { request, response });
      }

      Requests.capture(request, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
    }


    if (messageType === WORKER_MESSAGE_TYPES.MIMIC_EMIT_EVENT) {
      event.stopImmediatePropagation();
      Emitter.emit(event.data.payload.eventType, event.data.payload.args);
    }
  });

  if (!isEnabled) {
    worker.postMessage({ type: EVENTS.MIMIC_TURN_OFF });
  }

  worker.postMessage({ type: EVENTS.MIMIC_SET_DATA, payload: API.mocks });
  API.on(EVENTS.STORAGE_PERSIST, () => worker.postMessage({ type: EVENTS.MIMIC_SET_DATA, payload: API.mocks }));
  API.on(EVENTS.MIMIC_TURN_OFF, () => worker.postMessage({ type: EVENTS.MIMIC_TURN_OFF }));
  API.on(EVENTS.MIMIC_TURN_ON, () => worker.postMessage({ type: EVENTS.MIMIC_TURN_ON }));
}
