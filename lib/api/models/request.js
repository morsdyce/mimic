import uuid from 'uuid';

export class Request {

  constructor({ method, url, params, headers, response, mock }) {
    // Expected in response: { status, delay, headers, body }
    Object.assign(this, { id: uuid.v4(), method, url, params, headers, mock });

    Object.assign(this, {
      requestHash: this.buildRequestHash(params),
      response: response
    });
  }

  buildRequestHash(params = '') {
    return [this.method, this.url, params].join('|');
  }

  buildMockedRequestData() {

    const defaultState = {
      name: 'Mocked original response',
      response: {
        status: this.response.status,
        delay: this.response.delay,
        headers: JSON.stringify(this.response.header || {}),
        body: this.response.body
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

  setMock(mockedRequest) {
    this.mock = mockedRequest;
  }

  removeMock() {
    delete this.mock;
  }
  
  update(url) {
    this.url = url;
    this.requestHash = this.buildRequestHash(this.params);
  }

}
