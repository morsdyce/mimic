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
    const sameRequestHash = this.mockedRequests
      .filter((request) => request.requestHash === capturedRequest.requestHash)
      .length;

    if (sameRequestHash) {
      return;
    }

    this.mockedRequests.push(
      new MockedRequest(capturedRequest.buildMockedRequestData())
    );

    PersistentStorage.persist();
  }

}

export default new MockedRequests();
