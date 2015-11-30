export class Request {

  constructor({ method, url, params, headers, response }) {

    // Expected in response: { status, delay, headers, body }

    Object.assign(this, {
      method,
      url,
      params,
      headers,
      requestHash: this.buildRequestHash(params),
      originalResponse: response
    });
  }

  buildRequestHash(params = {}) {
    let paramsHash = Object.keys(params)
      .map((paramKey) => `${ paramKey }=${ params[paramKey] }`);

    return `${ method }|${ url }|${ paramsHash.join('|') }`;
  }

  buildMockedRequestData() {

    const request = {
      method: this.method,
      url: this.url,
      params: this.params,
      headers: this.headers
    };

    const defaultState = {
      name: 'Original Response',
      response: {
        status: this.originalResponse.status,
        delay: this.originalResponse.delay,
        headers: this.originalResponse.headers,
        body: this.originalResponse.body
      }
    };

    return {
      request,
      requestHash: this.requestHash,
      states: [defaultState]
    };
  }

}
