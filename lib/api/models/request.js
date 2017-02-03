import uuid from 'uuid';

export class Request {

  constructor({ id = uuid.v4(), method, url, params, headers, response, origin }) {
    // Expected in response: { status, delay, headers, body }
    Object.assign(this, { id, method, url, params, headers, origin });

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

  setMock(id) {
    this.mockId = id;
  }

  removeMock() {
    delete this.mockId;
  }

  update(url, name) {
    this.url = url;
    this.name = name;
    this.requestHash = this.buildRequestHash(this.params);
  }

}
