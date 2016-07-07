import uuid from 'uuid';
import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';
import Requests from 'api/requests';
import { get } from 'lodash';

export class Scenario {

  constructor({ id = uuid.v4(), name, active = false, mockedRequests = [] }) {
    mockedRequests = mockedRequests.map((mockedRequest) => new MockedRequest(mockedRequest));

    Object.assign(this, { id, name, active, mockedRequests });
  }

  rename(newName) {
    this.name = newName;
  }

  mockRequest(request) {
    const mockedRequest = new MockedRequest(request);
    this.mockedRequests.push(mockedRequest);

    return mockedRequest;
  }

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.id === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });
  }

  updateMockedRequest(mockRequestId, request) {
    Requests.capturedRequests
      .filter((capturedRequest) => get(capturedRequest, 'mock.id') === mockRequestId)
      .forEach((capturedRequest) => Requests.updateUrl(capturedRequest.id, request.url));

    this.findMockedRequestById(mockRequestId).update(request);
  }

  findMockedRequestById(mockedRequestId) {
    return this.mockedRequests
      .filter((request) => request.id === mockedRequestId)[0];
  }

  toggleMockedRequest(mockedRequestId) {
    const mockedRequest = this.findMockedRequestById(mockedRequestId);

    mockedRequest.active = !mockedRequest.active;
  }

  export() {
    try {
      const exportObject = {
        "version": PersistentStorage.getVersion(),
        "scenarios": [this]
      };

      return JSON.stringify(exportObject);
    } catch(ex) {
      return null;
    }
  }

  exportMock(mockId) {
    try {
      const mock = this.findMockedRequestById(mockId);

      const scenario = Object.assign({}, this, { mockedRequests: [mock] });
      const exportObject = {
        "version": PersistentStorage.getVersion(),
        "scenarios": [scenario]
      };

      return JSON.stringify(exportObject);
    } catch (ex) {
      return null;
    }
  }
}
