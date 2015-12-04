import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';

export class MockedRequests {

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.mockedRequests = PersistentStorage.dataTree.mockedRequests
      .map((mockedRequest) => new MockedRequest(mockedRequest));

    PersistentStorage.dataTree.mockedRequests = this.mockedRequests;
  }

  addMockedRequest(capturedRequest) {
    const sameRequestHash = this.getByHash(capturedRequest.requestHash);

    if (sameRequestHash) {
      return;
    }

    this.mockedRequests.push(
      new MockedRequest(capturedRequest.buildMockedRequestData())
    );

    PersistentStorage.persist();
  }

  getByHash(hash) {    
    return this.mockedRequests
      .find((request) => request.requestHash === hash);
  }

  mergeMockedRequests(mockedRequests) {
    for (let mockedRequest of mockedRequests) {
      let existingMockedRequest = this.getByHash(mockedRequest.requestHash);

      if (existingMockedRequest) {
        Object.assign(existingMockedRequest, mockedRequest);
      } else {
        this.mockedRequests.push(new MockedRequest(mockedRequest));
      }
    }
  }

}

export default new MockedRequests();
