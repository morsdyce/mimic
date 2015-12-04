import Emitter from 'api/emitter';
import XHRInterceptor from 'api/interceptor';
import { PersistentStorage } from 'api/storage';
import MockedRequests from 'api/mocked-requests';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import EVENTS from 'api/constants/events';

class PublicAPI {

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

  duplicateScenario(scenarioId) {
    Scenarios.duplicateScenario(scenarioId);
    Emitter.emit(EVENTS.SCENARIO_DUPLICATE);
    Emitter.emit(EVENTS.SCENARIO_CHANGE);
  }

  setCurrentScenario(scenarioId) {
    Scenarios.setCurrentScenario(scenarioId);
    Emitter.emit(EVENTS.SCENARIO_SET_ACTIVE);
  }

  getCurrentScenario() {
    return Scenarios.getCurrentScenario();
  }

  addMockedRequestToScenario(scenarioId, mockedRequestId) {
    Scenarios.addMockedRequestToScenario(scenarioId, mockedRequestId);
    Emitter.emit(EVENTS.SCENARIO_ADD_MOCKED_REQUEST);
  }

  mockRequest(request) {
    MockedRequests.addMockedRequest(request);
    Emitter.emit(EVENTS.MOCKED_REQUESTS_ADD);
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
