import { Request } from 'api/models/request';

const capturedRequests = [];

export default class Requests {

  static capture(request, response) {
    const capturedRequest = new Request({
      method: request.method,
      url: request.url,
      params: JSON.parse(request.body || '{}'),
      headers: request.headers,
      response: {
        status: response.status,
        delay: (Date.now() - request.startTime) || 0,
        header: response.headers,
        body: response.data
      }
    });

    capturedRequests.push(capturedRequest);
  }

  static get capturedRequests() {
    return capturedRequests;
  }
}
