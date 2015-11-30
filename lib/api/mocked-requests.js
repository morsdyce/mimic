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
    this.mockedRequests.push(new MockedRequest(capturedRequest));
  }

}

export default new MockedRequests();
