import EventEmitter from 'eventemitter3';
import XHRInterceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import MockedRequests from 'api/mocked-requests';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';

class PublicAPI extends EventEmitter {

  constructor() {
    this.version = '0.0.1';
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mockedRequests() {
    return MockedRequests.mockedRequests;
  }

  get scenarios() {
    return Scenarios.scenarios;
  }

  get rawData() {
    return PersistentStorage.getRaw();
  }

  addScenario(name) {
    Scenarios.addScenario(name);
    this.emit(EVENTS.SCENARIO_ADD);
    this.emit(EVENTS.SCENARIO_CHANGE);
  }

  renameScenario(scenarioId, newName) {
    Scenarios.renameScenario(scenarioId, newName);
    this.emit(EVENTS.SCENARIO_RENAME);
    this.emit(EVENTS.SCENARIO_CHANGE);
  }

  removeScenario(scenarioId) {
    Scenarios.removeScenario(scenarioId);
    this.emit(EVENTS.SCENARIO_REMOVE);
    this.emit(EVENTS.SCENARIO_CHANGE);
  }

  duplicateScenario(scenarioId) {
    Scenarios.duplicateScenario(scenarioId);
    this.emit(EVENTS.SCENARIO_DUPLICATE);
    this.emit(EVENTS.SCENARIO_CHANGE);
  }

  setCurrentScenario(scenarioId) {
    Scenarios.setCurrentScenario(scenarioId);
    this.emit(EVENTS.SCENARIO_SET_ACTIVE);
  }

  getCurrentScenario() {
    return Scenarios.getCurrentScenario();
  }

  addMockedRequestToScenario(scenarioId, mockedRequestId) {
    Scenarios.addMockedRequestToScenario(scenarioId, mockedRequestId);
    this.emit(EVENTS.SCENARIO_ADD_MOCKED_REQUEST);
  }

  mockRequest(request) {
    MockedRequests.addMockedRequest(request);
    this.emit(EVENTS.MOCKED_REQUESTS_ADD);
  }

  clearStorage() {
    PersistentStorage.clear();
  }

}

export const API = new PublicAPI();
