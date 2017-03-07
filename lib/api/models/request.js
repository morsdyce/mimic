import uuid from 'uuid';
import Mocks from 'api/mocks';

export class Request {

  constructor({ id, method, url, params, headers, response, origin, startTime }) {
    // Expected in response: { status, delay, headers, body }
    Object.assign(this, {
      id: id || uuid.v4(),
      method,
      url,
      params,
      headers,
      origin,
      startTime,
      response: response || {}
    });
  }

  get requestHash() {
    return [this.method, this.url, this.params || ''].join('|');
  }

  setMockStatus(mockStatus, mockId) {
    this.mockStatus = mockStatus;
    this.mockId = mockId;
  }

  get mock() {
    return Mocks.find({ id: this.mockId });
  }

  removeMock() {
    delete this.mockId;
  }

  update(url, name) {
    this.url = url;
    this.name = name;
  }

}
