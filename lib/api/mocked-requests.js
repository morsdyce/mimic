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

  findById(mockedRequestId) {
    return this.mockedRequests
      .filter((request) => request.id === mockedRequestId)[0];
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

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.id === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });

    PersistentStorage.persist();
  }

  addStateToMockedRequest(mockedRequestId, { name, response }) {
    this.findById(mockedRequestId).addState({ name, response });

    PersistentStorage.persist();
  }

  removeStateFromMockedRequest(mockedRequestId, stateId) {
    this.findById(mockedRequestId).removeState(stateId);

    PersistentStorage.persist();
  }

  updateStateInMockedRequest(mockedRequestId, stateId, { name, response }) {
    this.findById(mockedRequestId).updateState(stateId, { name, response });

    PersistentStorage.persist();
  }

}

export default new MockedRequests();
