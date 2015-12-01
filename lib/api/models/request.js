import uuid from 'uuid';

export class Request {

  constructor({ method, url, params, headers, response }) {

    // Expected in response: { status, delay, headers, body }

    Object.assign(this, { id: uuid.v4(), method, url, params, headers });

    Object.assign(this, {
      requestHash: this.buildRequestHash(params),
      originalResponse: response
    });
  }

  buildRequestHash(params = {}) {
    let paramsHash = Object.keys(params)
      .map((paramKey) => `${ paramKey }=${ params[paramKey] }`);

    return `${ this.method }|${ this.url }|${ paramsHash.join('|') }`;
  }

  buildMockedRequestData() {

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
      method: this.method,
      url: this.url,
      params: this.params,
      headers: this.headers,
      requestHash: this.requestHash,
      states: [defaultState]
    };
  }

}
