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

  buildRequestHash(params = '') {
    return [this.method, this.url, params].join('|');
  }

  buildMockedRequestData() {

    const defaultState = {
      name: 'Mocked Response',
      response: {
        status: this.originalResponse.status,
        delay: this.originalResponse.delay,
        headers: JSON.stringify(this.originalResponse.header || {}),
        body: this.originalResponse.body
      }
    };

    return {
      method: this.method,
      url: this.url,
      params: this.params,
      headers: Object.assign({}, this.headers),
      states: [defaultState]
    };
  }

}
