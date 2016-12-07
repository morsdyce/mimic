import xhook from 'xhook';
import { Communicator } from 'api/communicator';
import { getHeadersObject } from 'api/utils/headers';
import { logGroup, logGroupEnd } from 'api/utils/logger';

import STATUS_CODES from 'api/constants/status-codes';
import EVENTS from 'api/constants/events';
import forEach from 'lodash/forEach';

class XHRInterceptor {

  constructor(mode, options) {
    this.communicator = new Communicator(mode, options);

    xhook.before((request, responder) => {
      // Use this to determine how much time the request took
      request.startTime = Date.now();

      this.communicator.getCurrentMockedRequests()
        .then((mockedRequests) => {
          if (!mockedRequests.length) {
            return responder();
          }

          this.getRequestDetails(request).then(({ url, method, body }) => {
            for (let mockedRequest of mockedRequests) {
              if (mockedRequest.matches({ url, params: body, method })) {
                request.mock     = mockedRequest;
                let responseRule = mockedRequest.getResponse();

                this.logRequest(url, method, body, responseRule, request);
                return this.buildResponse(responder, responseRule, request);
              }
            }

            responder();
          });
        });
    });

    xhook.after((request, response) => {
      this.captureRequest(request, response);
    });
  }

  logRequest(url, method, body, responseRule, request) {
    const groupName = `%c BDSM captured request: ${method} %c ${url}`;
    logGroup(true, groupName, 'color: blue; font-weight: 300', 'font-weight: 300');
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);

    logGroup(true, 'request');
    console.log(`Params: ${body}`);

    logGroup(false, 'headers');
    forEach(request.headers, (value, key) => console.log(`${key}: ${value}`));
    logGroupEnd('headers');

    logGroupEnd('request');

    logGroup(true, 'response');
    console.log(`Status Code: ${responseRule.status}`);
    console.log(`Delay: ${responseRule.delay}`);

    logGroup(true, 'headers');
    forEach(responseRule.headers, (value, key) => console.log(`${key}: ${value}`));
    logGroupEnd('headers');

    console.log(`Body: ${responseRule.body}`);
    logGroupEnd('response');

    logGroupEnd(groupName);
  }

  getRequestDetails(request) {
    return new Promise((resolve, reject) => {
      const { url, method } = request;

      if (!(request instanceof Request)) {
        resolve({ url, method, body: request.body });
      }

      const clonedRequest = request.clone();

      clonedRequest.text().then((body) => {
        if (body === '') {
          body = undefined;
        }
        resolve({ url, method, body: body });
      }).catch((err) => reject(err));
    });
  }

  captureRequest(request, response = {}) {

    if (!(request instanceof Request)) {
      this.communicator.captureRequest(request, response);
      this.communicator.emit(EVENTS.REQUEST_CAPTURED);
      return;
    }

    const responseHeaders = getHeadersObject(response.headers);
    const requestHeaders  = getHeadersObject(request.headers);

    const { method, url, startTime, mock } = request;
    const { status } = response;

    const clonedRequest  = request.clone();
    const clonedResponse = response instanceof Response ? response.clone() : new Response(response);

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
        status: status || 404,
        headers: responseHeaders,
        data: body
      };

      this.communicator.captureRequest(capturedRequest, capturedResponse);
      this.communicator.emit(EVENTS.REQUEST_CAPTURED);
    });
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
      url: request.url,
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

export default XHRInterceptor;
