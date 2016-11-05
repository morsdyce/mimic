import Emitter from 'api/emitter';
import Interceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';
import { bootstrapWorker } from 'api/utils/worker';
import socketCluster from 'socketcluster-client';

class PublicAPI {

  constructor(options) {
    this.version = __VERSION;
    this.init();
  }

  init() {
    new Interceptor('window');
    PersistentStorage.init();
    Scenarios.init();
  }

  connect(options) {
    const defaultSocketOptions = {
      secure: false,
      hostname: 'localhost',
      port: 5000,
      autoReconnect: true,
      autoReconnectOptions: {
        randomness: 30000
      }
    };

    console.log('trying to connect to socket server', options);

    const socket = socketCluster.connect(Object.assign({}, defaultSocketOptions, options));

    socket.on('error', function (err) {
      console.error('Unable to connect to BDSM Remote. Is it running?');
    });

    socket.on('connect', () => {
      console.log('connected to remote server');
      socket.emit('bdsm-message', { type: 'BDSM_SET_DATA', payload: API.scenarios });
      API.on(EVENTS.STORAGE_PERSIST, () => socket.emit('bdsm-message', { type: 'BDSM_SET_DATA', payload: API.scenarios }));
    });


    const channel = socket.subscribe('bdsm-message');

    channel.watch(function (message) {
      console.log('ui remote message', message);
      if (message.type === EVENTS.REQUEST_CAPTURED) {
        console.log('request captured', message.payload);
        const { mockId, request, response } = message.payload;
        const mock = Scenarios.findMockById(mockId);

        if (mock) {
          request.mock = mock;
        }

        Requests.capture(request, response);
        Emitter.emit(EVENTS.REQUEST_CAPTURED);
      }

      if (message.type === 'BDSM_SET_SCENARIOS') {
        console.log('recieved data', message.payload);
        Scenarios.setScenarios(message.payload);
        Emitter.emit(EVENTS.SCENARIO_CHANGE);
      }

      if (message.type === 'GET_MOCKED_REQUESTS') {
        console.log('request for mocks recieved', API.scenarios);
        socket.emit('bdsm-message', { type: 'BDSM_SET_DATA', payload: API.scenarios });
      }
    });


  }

  setMode(mode) {
    this.mode = mode;
  }

  bootstrapWorker(worker) {
    bootstrapWorker(worker, API);
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mockedRequests() {
    return Scenarios.getMockedRequests();
  }

  get activeMockedRequests() {
    return Scenarios.getCurrentMockedRequests();
  }

  get scenarios() {
    return Scenarios.scenarios;
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
    Scenarios.mergeScenarios(dataTree.scenarios);
    PersistentStorage.persist();
    Emitter.emit(EVENTS.IMPORT);
  }

  export(prettify) {
    const scenarios = Scenarios.scenarios.map((scenario) => scenario.export());

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "scenarios": scenarios
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMock(scenarioId, mockId, prettify) {
    const scenario = Scenarios.getById(scenarioId).exportMock(mockId);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "scenarios": [scenario]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportMocks(scenarioId, mockIds, prettify) {
    const scenario = Scenarios.getById(scenarioId).exportMocks(mockIds);

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "scenarios": [scenario]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportScenario(scenarioId, prettify) {
    const scenario = Scenarios.getById(scenarioId).export();

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "scenarios": [scenario]
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  exportScenarios(scenarioIds, prettify) {
    const scenarios = scenarioIds.map((scenarioId) => Scenarios.getById(scenarioId).export());

    const exportObject = {
      "version": PersistentStorage.getVersion(),
      "scenarios": scenarios
    };

    return JSON.stringify(exportObject, null, prettify ? 2 : null);
  }

  addScenario(name) {
    Scenarios.addScenario(name);
    Emitter.emit(EVENTS.SCENARIO_ADD);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  toggleScenario(id) {
    Scenarios.toggle(id);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  renameScenario(scenarioId, newName) {
    Scenarios.renameScenario(scenarioId, newName);
    Emitter.emit(EVENTS.SCENARIO_RENAME);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  removeScenario(scenarioId) {
    Scenarios.removeScenario(scenarioId);
    Emitter.emit(EVENTS.SCENARIO_REMOVE);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  duplicateScenario(scenarioId) {
    Scenarios.duplicateScenario(scenarioId);
    Emitter.emit(EVENTS.SCENARIO_DUPLICATE);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  mockRequest(scenarioId, request) {
    Scenarios.mockRequest(scenarioId, request);
    Emitter.emit(EVENTS.MOCKED_REQUESTS_ADD);
  }

  updateMockedRequest(scenarioId, mockRequestId, request) {
    Scenarios.updateMockRequest(scenarioId, mockRequestId, request);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  removeMockedRequest(scenarioId, mockedRequestId) {
    Scenarios.removeMockedRequest(scenarioId, mockedRequestId);

    this.capturedRequests
      .filter((request) => (request.mock || {}).id === mockedRequestId)
      .forEach((request) => request.removeMock());

    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  toggleMockedRequest(scenarioId, mockedRequestId) {
    Scenarios.toggleMockedRequest(scenarioId, mockedRequestId);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  clearStorage() {
    PersistentStorage.clear();
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
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
