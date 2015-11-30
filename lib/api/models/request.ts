export class Request {

  constructor({ method, url, params, headers, response }) {

    /* Response object: { status, delay, headers, body } */
    Object.assign(this, { method, url, params, headers, response });
  }

  buildRuleData() {
    const request = {
      method: this.method,
      url: this.url,
      params: this.params,
      headers: this.headers
    };

    const response = {
      status: this.response.status,
      delay: this.response.delay,
      headers: this.response.headers,
      body: this.response.body
    };

    return { request, response };
  }

}
