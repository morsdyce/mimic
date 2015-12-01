import { xhook } from 'xhook';
import Scenarios from './scenarios';
import Requests from './requests';

class XHRInterceptor {

  constructor() {
    xhook.before((request, responder) => {

      // Use this to determine how much time the request took
      request.startTime = Date.now();

      if (!Scenarios.currentScenario) {
        return responder();
      }

      const mockedRequests = Scenarios.getCurrentScenario().mockedRequests;

      for (let request of mockedRequests) {
        const methodsMatch = request.method === request.request.method;
        const urlsMatch    = request.url === request.request.url;
        const paramsMatch  = this.checkParamsEquality(request.body, request.request.parameters);

        if (methodsMatch && urlsMatch && paramsMatch && request.active) {
          return this.buildResponse(responder, request.response);
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
