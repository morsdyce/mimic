import xhook from 'xhook';
import { Communicator } from 'api/communicator';
import { getHeadersObject } from 'api/utils/headers';
import { logGroup, logGroupEnd } from 'api/utils/logger';
import uuid from 'uuid';

import STATUS_CODES from 'api/constants/status-codes';
import EVENTS from 'api/constants/events';
import forEach from 'lodash/forEach';

class XHRInterceptor {

  constructor(mode, options) {
    this.communicator = new Communicator(mode, options);

    xhook.before((request, responder) => {
      // Use this to determine how much time the request took
      request.id = uuid.v4();
      request.startTime = Date.now();

      this.capturePendingRequest(request);

      this.communicator.getActiveMocks()
        .then((mocks) => {
          if (!mocks.length) {
            return responder();
          }

          this.getRequestDetails(request).then(({ url, method, body }) => {
            for (let mock of mocks) {
              if (mock.matches({ url, params: body, method })) {
                this.communicator.setRequestMock(request.id, mock.id);
                let responseRule = mock.getResponse();

                this.logRequest(url, method, body, responseRule, request);
                return this.buildResponse(responder, responseRule, request);
              }
            }

            responder();
          });
        });
    });

    xhook.after((request, response) => {
      this.updateCapturedRequest(request, response);
    });
  }

  logRequest(url, method, body, responseRule, request) {
    const groupName = `%c MIMIC %c ${method} ${url.split('://')[1]} | ${responseRule.status} | ${responseRule.delay}ms`;
    logGroup(true, groupName, 'background-color: #efefef; font-weight: 300', 'font-weight: 600');

    logGroup(false, 'Request Headers');
    forEach(request.headers, (value, key) => console.log(`${key}: ${value}`));
    logGroupEnd('Request Headers');

    logGroup(false, 'Request Params');
    console.log(body);
    logGroupEnd('Request Params');

    logGroup(false, 'Response Headers');
    forEach(responseRule.headers, (value, key) => console.log(`${key}: ${value}`));
    logGroupEnd('Response Headers');

    logGroup(false, 'Response Body');
    console.log(responseRule.body);
    logGroupEnd('Response Body');

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

  capturePendingRequest(request) {
    if (!(request instanceof Request)) {
      this.communicator.capturePendingRequest(request);
      this.communicator.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
      return;
    }

    const requestHeaders  = getHeadersObject(request.headers);
    const { id, method, url, startTime } = request;
    const clonedRequest  = request.clone();

    clonedRequest
      .text()
      .then((params) => {
        const capturedRequest = {
          id,
          method,
          url,
          params,
          headers: requestHeaders,
          startTime
        };

        this.communicator.capturePendingRequest(capturedRequest);
        this.communicator.emit(EVENTS.REQUEST_CAPTURED, { requestId: request.id });
      });
  }

  updateCapturedRequest(request, response) {
    if (!(request instanceof Request)) {
      this.communicator.setCapturedRequestResponse(request.id, response, request.startTime);
      this.communicator.emit(EVENTS.RESPONSE_RECEIVED, { requestId: request.id });
      return;
    }

    const responseHeaders = getHeadersObject(response.headers);

    const { status } = response;

    const clonedResponse = response instanceof Response ? response.clone() : new Response(response);

    clonedResponse
      .text()
      .then((body) => {
        const capturedResponse = {
          status: status || 404,
          headers: responseHeaders,
          data: body
        };

        this.communicator.setCapturedRequestResponse(request.id, capturedResponse, request.startTime);
        this.communicator.emit(EVENTS.RESPONSE_RECEIVED, { requestId: request.id });
      });
  }

  enable() {
    xhook.enable();
  }

  disable() {
    xhook.disable();
  }

  buildResponse(responder, responseRule, request) {
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
