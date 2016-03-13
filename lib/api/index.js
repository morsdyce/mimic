import Emitter from 'api/emitter';
import XHRInterceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';

class PublicAPI {

  constructor() {
    this.version = '0.0.1';
    this.init();
  }

  init() {
    PersistentStorage.init();
    Scenarios.init();
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  //get mockedRequests() {
  //  return MockedRequests.mockedRequests;
  //}

  get scenarios() {
    return Scenarios.scenarios;
  }

  //get rawData() {
  //  return PersistentStorage.getRaw();
  //}
  //
  //get activeMockedRequests() {
  //  return Scenarios.getCurrentMockedRequests();
  //}

  getAppName() {
    return PersistentStorage.getAppName();
  }

  setAppName(appName) {
    PersistentStorage.setAppName(appName);
    this.init();
    return this; // Allow chaining
  }
  //
  //import(data = '{}') {
  //  const dataTree = JSON.parse(data);
  //  Scenarios.mergeScenarios(dataTree.scenarios);
  //  MockedRequests.mergeMockedRequests(dataTree.mockedRequests);
  //  PersistentStorage.persist();
  //  Emitter.emit(EVENTS.IMPORT);
  //}
  //
  //export() {
  //  return PersistentStorage.getRaw();
  //}

  addScenario(name) {
    Scenarios.addScenario(name);
    Emitter.emit(EVENTS.SCENARIO_ADD);
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

  //unMockRequest(scenarioId, mockedRequestId) {
  //  Scenarios.removeMockedRequestFromScenario(scenarioId, mockedRequestId);
  //}
  //
  //duplicateScenario(scenarioId) {
  //  Scenarios.duplicateScenario(scenarioId);
  //  Emitter.emit(EVENTS.SCENARIO_DUPLICATE);
  //  Emitter.emit(EVENTS.SCENARIO_CHANGE);
  //}

  mockRequest(scenarioId, request) {
    Scenarios.mockRequest(scenarioId, request);
    Emitter.emit(EVENTS.MOCKED_REQUESTS_ADD);
  }

  //unmockRequest(mockedRequestId) {
  //  Scenarios.removeMockedRequestFromAllScenarios(mockedRequestId);
  //  MockedRequests.removeMockedRequest(mockedRequestId);
  //}
  //
  //toggleMockedRequest(scenarioId, mockedRequestId) {
  //  Scenarios.toggleMockedRequestInScenario(scenarioId, mockedRequestId);
  //}

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
