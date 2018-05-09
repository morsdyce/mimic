import Emitter from 'api/emitter';
import { PersistentStorage } from 'api/storage';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { bootstrapWorker } from 'api/utils/worker';
import { connect } from 'api/utils/remote';
import { request } from 'ui/utils/request';
import { migrateData } from 'api/migrations';
import flatten from 'lodash/flatten';
import Socket from 'api/socket';

class PublicAPI {

  constructor() {
    this.version = __VERSION;
    this.enabled = true;
    this.isRecording = false;
    this.interceptor = null;
    this.mode = null;
    this.socket = new Socket();
    this.init();
  }

  registerMimicSyncEvents() {
    // Register relevant events and pass to the socket
    const syncEvents = [
      EVENTS.ADD_GROUP,
      EVENTS.UPDATE_GROUP,
      EVENTS.REMOVE_GROUP,

      EVENTS.ADD_MOCK,
      EVENTS.UPDATE_MOCK,
      EVENTS.REMOVE_MOCK,
      EVENTS.RENAME_MOCK,
      EVENTS.DUPLICATE_MOCK,

      EVENTS.IMPORT
    ];

    syncEvents.forEach((eventName) => Emitter.on(eventName, (data) => {
      let payload = null;

      switch(eventName) {
        case EVENTS.ADD_GROUP:
        case EVENTS.UPDATE_GROUP:
          payload = { groups: [this.getGroup(data.groupId)] };
          break;

        case EVENTS.REMOVE_GROUP:
          payload = { groupId: data.groupId };
          break;

        case EVENTS.ADD_MOCK:
        case EVENTS.UPDATE_MOCK:
        case EVENTS.RENAME_MOCK:
        case EVENTS.DUPLICATE_MOCK:
          payload = { mocks: [this.getMock(data.mockId)] };
          break;

        case EVENTS.REMOVE_MOCK:
          payload = { mockId: data.mockId };
          break;
      }

      this.socket.emit('sync-message', {
        type: eventName,
        payload: {
          "version": PersistentStorage.getVersion(),
          ...payload
        }
      })
    }));

    this.socket.on('sync-message', ({ type, payload }) => {
      const { groups, mocks } = payload;

      groups.forEach((group) => this.import(group));
      mocks.forEach((mocks) => this.import(mocks));
    });

    this.socket.emit('sync-message', {
      type: EVENTS.LOAD_MOCKS_FROM_SYNC
    });
  }

  init() {
    PersistentStorage.init();
    Mocks.init();
    Groups.init();
  }

  registerInterceptor(interceptor) {
    this.interceptor = interceptor;
  }

  connect(options) {
    this.socket.connect(options, API);

    if (this.mode !== 'remote') {
      this.registerMimicSyncEvents();
    }
  }

  turnOn() {
    this.enabled = true;
    Emitter.emit(EVENTS.MIMIC_TURN_ON);
  }

  turnOff() {
    this.enabled = false;
    Emitter.emit(EVENTS.MIMIC_TURN_OFF);
  }

  setMode(mode) {
    this.mode = mode;
  }

  bootstrapWorker(worker) {
    bootstrapWorker(worker, API, this.enabled);
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

  addMock() {
    const newMock = Mocks.addMock();
    Emitter.emit(EVENTS.ADD_MOCK, { mockId: newMock.id });

    return newMock;
  }

  getGroup(groupId) {
    return Groups.find({ id: groupId });
  }

  addGroup(group) {
    const newGroup = Groups.addGroup(group);
    Emitter.emit(EVENTS.ADD_GROUP, { groupId: newGroup.id });

    return newGroup;
  }

  updateGroup(groupId, group) {
    Groups.updateGroup(groupId, group);
    Emitter.emit(EVENTS.UPDATE_GROUP, { groupId });
  }

  toggleGroup(groupId) {
    Groups.toggleGroup(groupId);
    Emitter.emit(EVENTS.UPDATE_GROUP, { groupId });
  }

  removeGroup(groupId) {
    Groups.removeGroup(groupId);
    Emitter.emit(EVENTS.REMOVE_GROUP, { groupId });
  }

  duplicateGroup(groupId) {
    Groups.duplicateGroup(groupId);
    Emitter.emit(EVENTS.UPDATE_GROUP, { groupId });
  }

  getAppName() {
    return PersistentStorage.getAppName();
  }

  setAppName(appName) {
    PersistentStorage.setAppName(appName);
    this.init();
    return this; // Allow chaining
  }

  import(data = '{}', options) {
    return new Promise((resolve, reject) => {
      if (this.interceptor) {
        return this.interceptor.waitForInit()
          .then(() => {
            try {
              const dataTree = JSON.parse(data);

              if (!dataTree.version && !dataTree.mocks && !dataTree.groups) {
                resolve({ success: false, error: 'Unsupported format' });
                return;
              }

              const migratedDataTree = migrateData(dataTree);

              Mocks.mergeMocks(migratedDataTree.mocks || [], options);
              Groups.mergeGroups(migratedDataTree.groups || []);
              Emitter.emit(EVENTS.IMPORT);
            } catch (error) {
              if (__ENV === 'development') {
                console.log('Import error', error);
              }

              resolve({ success: false, error: error.message });
            }

            resolve({ success: true });
          });
      }

      reject('interceptor not ready');
    });
  }

  importUrl(url, options, done) {
    request({
      method: 'GET',
      url: 'https://query.yahooapis.com/v1/public/yql?format=json&q=select * from html where url=\"' + url + '\"'
    }, (response) => {
      try {
        const dataTree = JSON.parse(response.body).query.results.body;

        this.import(dataTree, options)
          .then(done)
          .catch(done);
      } catch (error) {
        done({ success: false, error: error.message });
      }
    });
  }

  export(prettify) {
    const mocks = Mocks.all.map((mock) => mock.export());
    const groups = flatten(Groups.all.map((group) => group.export()));

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": mocks,
      "groups": groups
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMocks(mockIds, groupIds, prettify) {
    const mocks = Mocks.export(mockIds);
    const groups = Groups.export(groupIds);
    const groupMocks = flatten(groups.map((group) => group.mocks));

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "mocks": [...mocks, ...groupMocks],
      "groups": groups
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  startRecording() {
    const mockRequest = ({ requestId }) => Mocks.mockRequest(Requests.find({ id: requestId }));

    this.on(EVENTS.RESPONSE_RECEIVED, mockRequest);
    this.once(EVENTS.STOPPED_RECORDING, () => this.off(EVENTS.RESPONSE_RECEIVED, mockRequest));

    this.isRecording = true;
    Emitter.emit(EVENTS.START_RECORDING);
  }

  stopRecording() {
    this.isRecording = false;
    Emitter.emit(EVENTS.STOPPED_RECORDING);
  }

  recaptureMocks(mockIds, done) {
    Mocks.recapture(mockIds, done);
  }

  mockRequest(request) {
    const mock = Mocks.mockRequest(request);
    Emitter.emit(EVENTS.ADD_MOCK, { mockId: mock.id });

    return mock;
  }

  updateMock(mockId, request) {
    Mocks.updateMock(mockId, request);
    Emitter.emit(EVENTS.UPDATE_MOCK, { mockId });
  }

  duplicateMock(mockId) {
    const duplicatedMock = Mocks.duplicateMock(mockId);
    Emitter.emit(EVENTS.ADD_MOCK, { mockId: duplicatedMock.id });

    return duplicatedMock;
  }

  removeMock(mockId) {
    Mocks.removeMock(mockId);

    this.capturedRequests
      .filter((request) => (request.mock || {}).id === mockId)
      .forEach((request) => request.removeMock());

    Emitter.emit(EVENTS.REMOVE_MOCK, { mockId });
  }


  renameMock(mockId, newName) {
    Mocks.renameMock(mockId, newName);
    Emitter.emit(EVENTS.RENAME_MOCK, { mockId });
  }

  toggleMock(mockId) {
    Mocks.toggleMock(mockId);
    Emitter.emit(EVENTS.UPDATE_MOCK, { mockId });
  }

  getMatchingMocks(request) {
    return Mocks.getMatchingMocks(request);
  }

  clearStorage() {
    PersistentStorage.clear();
    Emitter.emit(EVENTS.CLEAR_ALL, { mockId: null });
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

export { API as default, Requests };
