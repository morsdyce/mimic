import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';

export function getCurrentMockedRequests() {
  return new Promise((resolve, reject) => {
    resolve(Scenarios.getCurrentMockedRequests());
  });
}

export function captureRequest(request, response) {
  return Requests.capture(request, response);
}

export function emit(event) {
  Emitter.emit(event);
}
