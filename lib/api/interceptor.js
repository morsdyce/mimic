import { xhook } from 'xhook';
import Scenarios from './scenarios';
import Requests from './requests';
import MockedRequests from './mocked-requests';

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
        const methodsMatch = mockedRequest.method === mockedRequest.method;
        const urlsMatch    = mockedRequest.url === mockedRequest.url;
        const paramsMatch  = this.checkParamsEquality(mockedRequest.body, mockedRequest.parameters);

        if (methodsMatch && urlsMatch && paramsMatch && mockedRequest.active) {
          return this.buildResponse(responder, mockedRequest.getResponse());
        }
      }

      return responder();
    });

    xhook.after((request, response) => {
      Requests.capture(request, response);
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
      status: responseRule.statusCode || 200,
      data: JSON.stringify(responseRule.body || {}),
      headers: responseRule.headers || {}
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
