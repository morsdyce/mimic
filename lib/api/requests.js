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
        status: response.status || 0,
        delay: (Date.now() - request.startTime) || 0,
        header: response.headers || {},
        body: response.data || ''
      }
    });

    capturedRequests.push(capturedRequest);
  }

  static get capturedRequests() {
    return capturedRequests;
  }
}
