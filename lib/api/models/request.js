import uuid from 'uuid';
import Mocks from 'api/mocks';

export class Request {

  constructor({ method, url, params, headers, response, origin }) {
    // Expected in response: { status, delay, headers, body }
    Object.assign(this, { id: uuid.v4(), method, url, params, headers, origin, response });
  }

  get requestHash() {
    return [this.method, this.url, this.params || ''].join('|');
  }

  setMock(id) {
    this.mockId = id;
  }

  get mock() {
    return Mocks.find({ requestHash: this.requestHash });
  }

  removeMock() {
    delete this.mockId;
  }

  update(url, name) {
    this.url = url;
    this.name = name;
  }

}
