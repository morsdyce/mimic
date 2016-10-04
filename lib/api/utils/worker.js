import Emitter from 'api/emitter';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';

export function bootstrapWorker(worker, API) {
  worker.addEventListener('message', (message) => {
    if (message.data.type === 'CAPTURE_REQUEST') {

      const request = message.data.payload.request;
      const response = message.data.payload.response;
      const mockId = message.data.payload.mockId;

      if (mockId) {
        request.mock = API.mockedRequests.filter((mock) => mock.id === mockId)[0];
      }

      Requests.capture(request, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
    }

    if (message.data.type === 'EMIT_EVENT') {
      Emitter.emit(message.data.payload);
    }
  });

  worker.postMessage({ type: 'SET_DATA', data: API.mockedRequests })
  API.on(EVENTS.STORAGE_PERSIST, () => worker.postMessage({ type: 'SET_DATA', data: API.mockedRequests }));
}
