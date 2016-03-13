import uuid from 'uuid';
import { MockedRequest } from 'api/models/mocked-request';

export class Scenario {

  constructor({ id = uuid.v4(), name, active, mockedRequests = [] }) {
    Object.assign(this, { id, name, active, mockedRequests });
  }

  rename(newName) {
    this.name = newName;
  }

  mockRequest(request) {
    this.mockedRequests.push(new MockedRequest(request));
  }

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.id === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });
  }

  findMockedRequestById(mockedRequestId) {
    return this.mockedRequests
      .filter((request) => request.id === mockedRequestId)[0];
  }

  toggleMockedRequest(mockedRequestId) {
    const mockedRequest = this.findMockedRequestById(mockedRequestId);

    mockedRequest.active = !mockedRequest.active;
  }
}
