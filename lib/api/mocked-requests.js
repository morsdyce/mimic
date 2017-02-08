import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';
import Requests from 'api/requests';

import find from 'lodash/find';
import isObject from 'lodash/isObject';

export class MockedRequests {

  init() {
    this.loadFromStorage();
    this._registerEvents();
  }

  _registerEvents() {
    Emitter.on(EVENTS.MOCKED_REQUEST_CHANGE, this.loadFromStorage, this);
    Emitter.on(EVENTS.IMPORT, this.loadFromStorage, this);
    Emitter.on(EVENTS.STORAGE_PERSIST, this.loadFromStorage, this);
  }

  loadFromStorage() {
    this.mocks = PersistentStorage.dataTree.mocks
      .map((mock) => new MockedRequest(mock));

    PersistentStorage.dataTree.mocks = this.mocks;
  }

  setMockedRequests(mocks) {
    this.mocks = mocks.map((mock) => new MockedRequest(mock));

    PersistentStorage.dataTree.mocks = this.mocks;
    PersistentStorage.persist();
  }

  getMockedRequests() {
    return this.mocks;
  }

  getMockedRequest(id) {
    return find(this.mocks, { id });
  }

  getCurrentMockedRequests() {
    return this.mocks.filter((mock) => mock.active);
  }

  mockRequest(request) {
    const mock = new MockedRequest(request);
    this.mocks.push(mock);

    const originalRequest = Requests.getById(request.requestId);

    if (originalRequest) {
      originalRequest.setMock(mock.id);
    }

    PersistentStorage.persist();
  }

  mergeMockedRequests(mocks) {
    for (const mock of mocks) {

      // deserialize json mock request body
      if (isObject(mock.response.body)) {
        mock.response.body = JSON.stringify(mock.response.body);
      }

      if (isObject(mock.params)) {
        mock.params = JSON.stringify(mock.params);
      }

      const existingMock = find(this.mocks, { id: mock.id });

      if (existingMock) {
        Object.assign(existingMock, mock);
      } else {
        this.mocks.push(new MockedRequest(mock));
      }
    }

    PersistentStorage.persist();
  }

  toggleMockedRequest(mockId) {
    const mock = this.getMockedRequest(mockId);

    mock.active = !mock.active;

    PersistentStorage.persist();
  }

  export() {
    try {
      return this.mocks.map((mock) => mock.export());
    } catch(ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMock(mockId) {
    try {
      return this.getMockedRequest(mockId).export();
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMocks(mockIds) {
    try {
      return mockIds.map((mockId) => this.getMockedRequest(mockId).export());
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  updateMockedRequest(mockRequestId, request) {
    Requests.capturedRequests
      .filter((capturedRequest) => get(capturedRequest, 'mock.id') === mockRequestId)
      .forEach((capturedRequest) => Requests.update(capturedRequest.id, request.url, request.name));

    this.getMockedRequest(mockRequestId).update(request);
  }

  removeMockedRequest(mockId) {
    this.mocks.forEach((request, index) => {
      if (request.id === mockId) {
        return this.mocks.splice(index, 1);
      }
    });

    PersistentStorage.persist();
  }
}

export default new MockedRequests();
