import { xhook } from 'xhook';
import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import MockedRequests from 'api/mocked-requests';

import STATUS_CODES from 'api/constants/status-codes';
import EVENTS from 'api/constants/events';
import { evalResponse } from 'api/eval-response';

class XHRInterceptor {

  constructor() {
    xhook.before((xhrRequest, responder) => {

      // Use this to determine how much time the request took
      xhrRequest.startTime = Date.now();

      if (!Scenarios.getCurrentMockedRequests()) {
        return responder();
      }

      const mockedRequests = Scenarios.getCurrentMockedRequests();
      const {url, body, method} = xhrRequest;

      for (let mockedRequest of mockedRequests) {
        if (mockedRequest.matches({ url, params: body, method })) {
          let responseRule = mockedRequest.getResponse(mockedRequest.selectedStateId);
          return this.buildResponse(responder, responseRule, xhrRequest);
        }
      }

      return responder();
    });

    xhook.after((xhrRequest, response) => {
      Requests.capture(xhrRequest, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
    });
  }

  enable() {
    xhook.enable();
  }

  disable() {
    xhook.disable();
  }

  buildResponse(responder, responseRule, xhrRequest) {
    //let responseBody = evalResponse(responseRule, xhrRequest);
    const response = {
      status: Number(responseRule.status) || 200,
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

      if (regex && requestParams[key] && !requestParams[key].toString().match(regex)) {
        return false;
      }
    }

    return true;
  }
}

export default new XHRInterceptor();
