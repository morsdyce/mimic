import { xhook } from 'xhook';
import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import MockedRequests from 'api/mocked-requests';

import STATUS_CODES from 'api/constants/status-codes';
import EVENTS from 'api/constants/events';

class XHRInterceptor {

  constructor() {
    xhook.before((request, responder) => {

      // Use this to determine how much time the request took
      request.startTime = Date.now();

      if (!Scenarios.getCurrentMockedRequests()) {
        return responder();
      }

      const mockedRequests = Scenarios.getCurrentMockedRequests();

      for (let mockedRequest of mockedRequests) {
        const methodsMatch = request.method === mockedRequest.method;
        const urlsMatch    = request.url === mockedRequest.url;
        const paramsMatch  = this.checkParamsEquality(request.body, mockedRequest.params);

        if (methodsMatch && urlsMatch && paramsMatch && mockedRequest.active) {
          return this.buildResponse(responder, mockedRequest.getResponse(mockedRequest.selectedStateId));
        }
      }

      return responder();
    });

    xhook.after((request, response) => {
      Requests.capture(request, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
    });
  }

  enable() {
    xhook.enable();
  }

  disable() {
    xhook.disable();
  }

  buildResponse(responder, responseRule) {
    const response = {
      status: responseRule.status || 200,
      statusText: STATUS_CODES[responseRule.status || 200].toUpperCase(),
      data: responseRule.body,
      text: responseRule.body,
      headers: JSON.parse(responseRule.headers || '{}')
    };

    return responseRule.delay > 0
      ? setTimeout(() => responder(response), responseRule.delay)
      : responder(response);
  }

  checkParamsEquality(requestBody, responseParams) {
    const requestParams = JSON.parse(requestBody || '{}');
    const parameters    = Object.keys(requestParams);

    for (let key of parameters) {
      const regex = responseParams[key] ? new RegExp(responseParams[key]) : null;

      if (regex && !requestParams[key].match(regex)) {
        return false;
      }
    }

    return true;
  }
}

export default new XHRInterceptor();
