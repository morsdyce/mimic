import { Request } from './models/request';

export class Requests {

  constructor() {
    this.capturedRequests = [];
  }

  static capture(request, response) {
    const capturedRequest = new Request({
      method: request.method,
      url: request.url,
      params: JSON.parse(request.body || {}),
      headers: request.headers,
      response: {
        status: response.status,
        delay: (Number(new Date()) - request.startTime) || 0,
        header: response.headers,
        body: response.data
      }
    });

    this.capturedRequests.push(capturedRequest);
  }
}
