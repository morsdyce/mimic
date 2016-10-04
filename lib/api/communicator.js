import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import { MockedRequest } from 'api/models/mocked-request';
import { getHeadersObject } from 'api/utils/headers';

const isWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

let mockedRequests = [];
let fetchedRequests = false;

if (isWebWorker) {
  self.addEventListener('message', (message) => {
    mockedRequests = message.data.data.map((request) => new MockedRequest(request));
    fetchedRequests = true;
  });
}

export function getCurrentMockedRequests() {
  return new Promise((resolve, reject) => {
    if (!isWebWorker) {
      resolve(Scenarios.getCurrentMockedRequests());
    }

    const timerId = setInterval(() => {
      if (fetchedRequests) {
        clearInterval(timerId);
        resolve(mockedRequests);
      }
    }, 100);
  });
}

export function captureRequest(request, response) {
  if (isWebWorker) {
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

      self.postMessage({ type: 'CAPTURE_REQUEST', payload: {
        mockId: request.mock ? request.mock.id : null,
        request: jsonRequest,
        response: jsonResponse
      }});
    return;
  }

  Requests.capture(request, response);
}

export function emit(event) {
  if (isWebWorker) {
    self.postMessage({ type: 'EMIT_EVENT', payload: event });
    return;
  }

  Emitter.emit(event);
}
