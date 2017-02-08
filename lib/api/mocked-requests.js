import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';
import Requests from 'api/requests';

import find from 'lodash/find';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import uniqBy from 'lodash/uniqBy';

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
    this.mockedRequests = PersistentStorage.dataTree.mockedRequests
      .map((mockedRequest) => new MockedRequest(mockedRequest));

    PersistentStorage.dataTree.mockedRequests = this.mockedRequests;
  }

  setMockedRequests(mockedRequests) {
    this.mockedRequests = mockedRequests.map((mockedRequest) => new MockedRequest(mockedRequest));

    PersistentStorage.dataTree.mockedRequests = this.mockedRequests;
    PersistentStorage.persist();
  }

  getMockedRequests() {
    return this.mockedRequests;
  }

  getMockedRequest(id) {
    return find(this.mockedRequests, { id });
  }

  getCurrentMockedRequests() {
    return this.mockedRequests.filter((mockedRequest) => mockedRequest.active);
  }

  mockRequest(request) {
    const mockedRequest = new MockedRequest(request);
    this.mockedRequests.push(mockedRequest);

    const originalRequest = Requests.getById(request.requestId);

    if (originalRequest) {
      originalRequest.setMock(mockedRequest.id);
    }

    PersistentStorage.persist();
  }

  mergeMockedRequests(mockedRequests) {
    for (const mockedRequest of mockedRequests) {

      // deserialize json mock request body
      if (isObject(mockedRequest.response.body)) {
        mockedRequest.response.body = JSON.stringify(mockedRequest.response.body);
      }

      if (isObject(mockedRequest.params)) {
        mockedRequest.params = JSON.stringify(mockedRequest.params);
      }

      const existingMock = find(this.mockedRequests, { id: mockedRequest.id });

      if (existingMock) {
        Object.assign(existingMock, mockedRequest);
      } else {
        this.mockedRequests.push(new MockedRequest(mockedRequest));
      }
    }

    PersistentStorage.persist();
  }

  toggleMockedRequest(mockedRequestId) {
    const mockedRequest = this.getMockedRequest(mockedRequestId);

    mockedRequest.active = !mockedRequest.active;

    PersistentStorage.persist();
  }

  export() {
    try {
      return this.mockedRequests.map((mockedRequest) => mockedRequest.export());
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

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.id === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });

    PersistentStorage.persist();
  }
}

export default new MockedRequests();
