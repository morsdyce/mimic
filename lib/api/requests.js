import { Request } from 'api/models/request';
import find from 'lodash/find';

const capturedRequests = [];

export default class Requests {
  static capturePending(request) {
    const capturedRequest = new Request({
      id: request.id,
      method: request.method,
      url: request.url,
      params: request.body || request.params,
      headers: request.headers,
      origin: request.origin,
      response: null
    });

    capturedRequests.push(capturedRequest);
  }

  static setResponse(id, response, startTime) {
    const request = find(capturedRequests, { id });

    if (request) {
      request.response = {
        status: response.status || 200,
        delay: response.status === 0 ? 0 : (Date.now() - startTime),
        headers: response.headers || {},
        body: response.data || ''
      }
    }
  }

  static setMock(requestId, mockId) {
    const request = find(capturedRequests, { id: requestId });

    if (request) {
      request.mockId = mockId;
    }
  }

  static capture(request, response = {}) {
    const capturedRequest = new Request({
      method: request.method,
      url: request.url,
      params: request.body || request.params,
      headers: request.headers,
      origin: request.origin,
      response: {
        status: response.status || 200,
        delay: response.status === 0 ? 0 : (Date.now() - request.startTime),
        headers: response.headers || {},
        body: response.data || ''
      }
    });

    capturedRequests.push(capturedRequest);
  }

  static get capturedRequests() {
    return capturedRequests;
  }

  static find(options) {
    return find(capturedRequests, options);
  }

  static update(id, url, name) {
    this.find({ id }).update(url, name);
  }
}
