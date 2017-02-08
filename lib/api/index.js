import Emitter from 'api/emitter';
import Interceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import MockedRequests from 'api/mocked-requests';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { bootstrapWorker } from 'api/utils/worker';
import { connect } from 'api/utils/remote';
import { get, last } from 'lodash';

// only init the interceptor if we're running inside a browser
if (!get(global, 'isReactNative')) {
  new Interceptor('window');
}

class PublicAPI {

  constructor() {
    this.version = __VERSION;
    this.init();
  }

  init() {
    PersistentStorage.init();
    MockedRequests.init();
  }

  connect(options) {
    connect(options, API);
  }

  setMode(mode) {
    this.mode = mode;
  }

  bootstrapWorker(worker) {
    bootstrapWorker(worker, API);
  }

  getCapturedRequest(requestId) {
    return Requests.getCapturedRequest(requestId);
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mocks() {
    return MockedRequests.getMockedRequests();
  }

  getMockedRequest(mockId) {
    return MockedRequests.getMockedRequest(mockId);
  }

  get activeMockedRequests() {
    return MockedRequests.getCurrentMockedRequests();
  }

  get mocks() {
    return MockedRequests.mocks;
  }

  getAppName() {
    return PersistentStorage.getAppName();
  }

  setAppName(appName) {
    PersistentStorage.setAppName(appName);
    this.init();
    return this; // Allow chaining
  }

  import(data = '{}') {
    const dataTree = JSON.parse(data);
    MockedRequests.mergeMockedRequests(dataTree.mocks);
    Emitter.emit(EVENTS.IMPORT);
  }

  export(prettify) {
    const mocks = MockedRequests.mocks.map((mock) => mock.export());

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": mocks
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMock(mockId, prettify) {
    const mocks = MockedRequests.exportMock(mockId);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": [mocks]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMocks(mockIds, prettify) {
    const mocks = MockedRequests.exportMocks(mockIds);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": [mocks]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  record() {
    const onRequest = () => MockedRequests.mockRequest(last(this.capturedRequests));

    this.on(EVENTS.REQUEST_CAPTURED, onRequest);
    this.on(EVENTS.STOPPED_RECORDING, () => this.off(EVENTS.REQUEST_CAPTURED, onRequest));

    Emitter.emit(EVENTS.RECORDING);
  }

  stopRecording() {
    Emitter.emit(EVENTS.STOPPED_RECORDING);
  }

  mockRequest(request) {
    MockedRequests.mockRequest(request);
    Emitter.emit(EVENTS.ADD_MOCKED_REQUEST);
  }

  updateMockedRequest(mockRequestId, request) {
    MockedRequests.updateMockedRequest(mockRequestId, request);
    Emitter.emit(EVENTS.MOCKED_REQUEST_CHANGE);
  }

  removeMockedRequest(mocktId) {
    MockedRequests.removeMockedRequest(mocktId);

    this.capturedRequests
      .filter((request) => (request.mock || {}).id === mocktId)
      .forEach((request) => request.removeMock());

    Emitter.emit(EVENTS.MOCKED_REQUEST_CHANGE);
  }

  toggleMockedRequest(mocktId) {
    MockedRequests.toggleMockedRequest(mocktId);
    Emitter.emit(EVENTS.MOCKED_REQUEST_CHANGE);
  }

  clearStorage() {
    PersistentStorage.clear();
    Emitter.emit(EVENTS.MOCKED_REQUEST_CHANGE);
  }

  on(event, callback, context) {
    Emitter.on(event, callback, context);
  }

  once(event, callback, context) {
    Emitter.once(event, callback, context);
  }

  off(event, callback, context) {
    Emitter.removeListener(event, callback, context);
  }

}

export const API = new PublicAPI();
