import Emitter from 'api/emitter';
import Interceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import Scenarios from 'api/scenarios';
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
    Scenarios.init();
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

  get mockedRequests() {
    return Scenarios.getMockedRequests();
  }

  getMockedRequest(mockId) {
    return Scenarios.getMockedRequest(mockId);
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

  record(scenarioId) {
    const onRequest = () => Scenarios.mockRequest(scenarioId, last(this.capturedRequests));

    this.on(EVENTS.REQUEST_CAPTURED, onRequest);
    this.on(EVENTS.STOPPED_RECORDING, () => this.off(EVENTS.REQUEST_CAPTURED, onRequest));

    Emitter.emit(EVENTS.RECORDING);
  }

  stopRecording() {
    Emitter.emit(EVENTS.STOPPED_RECORDING);
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
