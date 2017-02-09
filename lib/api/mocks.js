import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { PersistentStorage } from 'api/storage';
import { Mock } from 'api/models/mock';
import Requests from 'api/requests';

import find from 'lodash/find';
import remove from 'lodash/remove';
import isObject from 'lodash/isObject';

export class Mocks {

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
    this.all = PersistentStorage.dataTree.mocks
      .map((mock) => new Mock(mock));

    PersistentStorage.dataTree.mocks = this.all;
  }

  setMocks(mocks) {
    this.all = mocks.map((mock) => new Mock(mock));

    PersistentStorage.dataTree.mocks = this.all;
    PersistentStorage.persist();
  }

  find(options) {
    return find(this.all, options);
  }

  mockRequest(request) {
    const mock = new Mock(request);
    this.all.push(mock);

    const originalRequest = Requests.find({ id: request.requestId });

    if (originalRequest) {
      originalRequest.setMock(mock.id);
    }

    PersistentStorage.persist();
  }

  mergeMocks(mocks) {
    for (const mock of mocks) {

      // deserialize json mock request body
      if (isObject(mock.response.body)) {
        mock.response.body = JSON.stringify(mock.response.body);
      }

      if (isObject(mock.params)) {
        mock.params = JSON.stringify(mock.params);
      }

      const existingMock = find(this.all, { id: mock.id });

      if (existingMock) {
        Object.assign(existingMock, mock);
      } else {
        this.all.push(new Mock(mock));
      }
    }

    PersistentStorage.persist();
  }

  toggleMock(mockId) {
    this.find({ id: mockId }).toggle();

    PersistentStorage.persist();
  }

  export() {
    try {
      return this.all.map((mock) => mock.export());
    } catch(ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMock(mockId) {
    try {
      return this.find({ id: mockId }).export();
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMocks(mockIds) {
    try {
      return mockIds.map((mockId) => this.find({ id: mockId }).export());
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  updateMock(mockId, request) {
    Requests.capturedRequests
      .filter((capturedRequest) => get(capturedRequest, 'mock.id') === mockId)
      .forEach((capturedRequest) => Requests.update(capturedRequest.id, request.url, request.name));

    this.find({ id: mockId }).update(request);

    PersistentStorage.persist();
  }

  removeMock(mockId) {
    remove(this.all, { id: mockId });

    PersistentStorage.persist();
  }
}

export default new Mocks();
