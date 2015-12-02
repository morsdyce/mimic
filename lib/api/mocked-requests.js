import { ShredderStorage } from './storage';
import { MockedRequest } from './models/mocked-request';

export class MockedRequests {

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.mockedRequests = ShredderStorage.dataTree.mockedRequests
      .map((mockedRequest) => new MockedRequest(mockedRequest));

    ShredderStorage.dataTree.mockedRequests = this.mockedRequests;
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

    ShredderStorage.persist();
  }

}

export default new MockedRequests();
