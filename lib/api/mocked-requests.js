import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';
import EVENTS from 'api/constants/events';
import Emitter from 'api/emitter';

export class MockedRequests {

  init() {
    this.loadFromStorage();
    this._registerEvents();
  }

  _registerEvents() {
    Emitter.on(EVENTS.IMPORT, this.loadFromStorage, this);
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

  updateMockedRequestUrl(mockedRequestId, url) {
    this.findById(mockedRequestId).url = url;

    PersistentStorage.persist();
  }

  getRequestHash(params = '') {
    return [this.method, this.url, params].join('|');
  }

  getByHash(hash) {
    return this.mockedRequests
      .find((request) => request.getRequestHash() === hash);
  }

  mergeMockedRequests(mockedRequests) {
    for (let mockedRequest of mockedRequests) {
      let existingMockedRequest = this.getByHash(mockedRequest.getRequestHash());

      if (existingMockedRequest) {
        Object.assign(existingMockedRequest, mockedRequest);
      } else {
        this.mockedRequests.push(new MockedRequest(mockedRequest));
      }
    }
  }

  selectStateInMockedRequest(mockedRequestId, stateId) {
    this.findById(mockedRequestId).selectState(stateId);

    PersistentStorage.persist();
  }

  toggleMockedRequest(mockedRequestId) {
    this.findById(mockedRequestId).toggle();

    PersistentStorage.persist();
  }

}

export default new MockedRequests();
