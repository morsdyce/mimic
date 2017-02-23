import Emitter from 'api/emitter';
import Interceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { bootstrapWorker } from 'api/utils/worker';
import { connect } from 'api/utils/remote';
import { get, last } from 'lodash';

let interceptor;

// only init the interceptor if we're running inside a browser
if (!get(global, 'isReactNative')) {
  interceptor = new Interceptor('window');
}

class PublicAPI {

  constructor() {
    this.version = __VERSION;
    this.enabled = true;
    this.init();
  }

  init() {
    PersistentStorage.init();
    Mocks.init();
    Groups.init();
  }

  connect(options) {
    connect(options, API);
  }

  turnOn() {
    interceptor.enable();
    this.enabled = true;
  }

  turnOff() {
    interceptor.disable();
    this.enabled = false;
  }

  setMode(mode) {
    this.mode = mode;
  }

  bootstrapWorker(worker) {
    bootstrapWorker(worker, API);
  }

  getCapturedRequest(requestId) {
    return Requests.find({ id: requestId });
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mocks() {
    return Mocks.all;
  }

  getMock(mockId) {
    return Mocks.find({ id: mockId });
  }

  get activeMocks() {
    return Mocks.findAll({ isActive: true });
  }

  get groups() {
    return Groups.all;
  }

  getGroup(groupId) {
    return Groups.find({ id: groupId });
  }

  addGroup(group) {
    const newGroup = Groups.addGroup(group);
    Emitter.emit(EVENTS.ADD_GROUP);

    return newGroup;
  }

  updateGroup(groupId, group) {
    Groups.updateGroup(groupId, group);
    Emitter.emit(EVENTS.UPDATE_GROUP);
  }

  toggleGroup(groupId) {
    Groups.toggleGroup(groupId);
    Emitter.emit(EVENTS.UPDATE_GROUP);
  }

  removeGroup(groupId) {
    Groups.removeGroup(groupId);
    Emitter.emit(EVENTS.UPDATE_GROUP);
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
    Mocks.mergeMocks(dataTree.mocks);
    Emitter.emit(EVENTS.IMPORT);
  }

  export(prettify) {
    const mocks = Mocks.all.map((mock) => mock.export());
    const groups = Groups.all.map((group) => group.export());

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": mocks,
      "groups": groups
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMock(mockId, prettify) {
    const mocks = Mocks.export(mockId);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": [mocks]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMocks(mockIds, prettify) {
    const mocks = Mocks.export(mockIds);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": [mocks]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  startRecording() {
    const onRequest = () => Mocks.mockRequest(last(this.capturedRequests));

    this.on(EVENTS.REQUEST_CAPTURED, onRequest);
    this.once(EVENTS.STOPPED_RECORDING, () => this.off(EVENTS.REQUEST_CAPTURED, onRequest));

    Emitter.emit(EVENTS.START_RECORDING);
  }

  stopRecording() {
    Emitter.emit(EVENTS.STOPPED_RECORDING);
  }

  mockRequest(request) {
    const mock = Mocks.mockRequest(request);
    Emitter.emit(EVENTS.ADD_MOCK);

    return mock;
  }

  updateMock(mockId, request) {
    Mocks.updateMock(mockId, request);
    Emitter.emit(EVENTS.UPDATE_MOCK);
  }

  removeMock(mockId) {
    Mocks.removeMock(mockId);

    this.capturedRequests
      .filter((request) => (request.mock || {}).id === mockId)
      .forEach((request) => request.removeMock());

    Emitter.emit(EVENTS.UPDATE_MOCK);
  }


  renameMock(mockId, newName) {
    Mocks.renameMock(mockId, newName);
    Emitter.emit(EVENTS.UPDATE_MOCK);
  }

  toggleMock(mockId) {
    Mocks.toggleMock(mockId);
    Emitter.emit(EVENTS.UPDATE_MOCK);
  }

  clearStorage() {
    PersistentStorage.clear();
    Emitter.emit(EVENTS.UPDATE_MOCK);
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

const API = new PublicAPI();

export default API;
