import xhook from 'xhook';
import Emitter from 'api/emitter';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';

import STATUS_CODES from 'api/constants/status-codes';
import EVENTS from 'api/constants/events';
import { evalResponse } from 'api/eval-response';

class XHRInterceptor {

  constructor() {
    xhook.before((request, responder) => {

      // Use this to determine how much time the request took
      request.startTime = Date.now();

      const mockedRequests = Scenarios.getCurrentMockedRequests();
      if (!mockedRequests.length) {
        return responder();
      }
      
      this.getRequestDetails(request).then(({url, method, body}) => {
        for (let mockedRequest of mockedRequests) {
          if (mockedRequest.matches({ url, params: body, method })) {
            request.mock = mockedRequest;

            let responseRule = mockedRequest.getResponse();
            return this.buildResponse(responder, responseRule, request);
          }
        }
        
        responder();
      });
    });

    xhook.after((request, response) => {
      this.captureRequest(request, response);
    });
  }

  getRequestDetails(request) {
    return new Promise((resolve, reject) => {
      const {url, method} = request;

      if ( !(request instanceof Request) ) {
        resolve({ url, method, body: request.body });
      }

      request.text().then((body) => {
        if (body === '') {
          body = undefined;
        }
        resolve({ url, method, body: body});
      }).catch((err) => reject(err));
    });
  }

  captureRequest(request, response = {}) {

    if ( !(request instanceof Request) ) {
      Requests.capture(request, response);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
      return;
    }

    const responseHeaders = this.getHeadersObject(response.headers);
    const requestHeaders = this.getHeadersObject(request.headers);

    const { method, url, startTime, mock } = request;
    const { status } = response;

    const clonedRequest = request.clone();
    const clonedResponse = response.clone();

    Promise.all([
      clonedRequest.text(),
      clonedResponse.text()
    ]).then((data) => {
      const [params, body] = data;

      const capturedRequest = {
        method,
        url,
        params,
        headers: requestHeaders,
        startTime,
        mock
      };

      const capturedResponse = {
        status,
        headers: responseHeaders,
        data: body
      };

      Requests.capture(capturedRequest, capturedResponse);
      Emitter.emit(EVENTS.REQUEST_CAPTURED);
    });

  }

  getHeadersObject(headers = []) {
    return Array.from(headers).reduce((result, item) => {
      result[item[0]] = item[1];
      return result
    }, {});
  }

  enable() {
    xhook.enable();
  }

  disable() {
    xhook.disable();
  }

  buildResponse(responder, responseRule, request) {
    //let responseBody = evalResponse(responseRule, request);
    const response = {
      status: Number(responseRule.status) || 200,
      statusText: STATUS_CODES[responseRule.status || 200].toUpperCase(),
      body: responseRule.body,
      text: responseRule.body,
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

      if (regex && requestParams[key] && !requestParams[key].toString().match(regex)) {
        return false;
      }
    }

    return true;
  }
}

export default new XHRInterceptor();
