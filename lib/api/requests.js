import { Request } from 'api/models/request';
import { UrlUtils } from 'api/utils/url';

const capturedRequests = [];

export default class Requests {

  static capture(request, response = {}) {
    const capturedRequest = new Request({
      method: request.method,
      url: request.url,
      params: request.body,
      headers: request.headers,
      mock: request.mock,
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

  static getById(id) {
    return capturedRequests.filter((request) => request.id === id)[0];
  }

  static updateUrl(id, url) {
    this.getById(id).update(url);
  }
}
