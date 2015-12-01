import XHRInterceptor from './interceptor';
import { ShredderStorage } from './storage';
import MockedRequests from './mocked-requests';
import Scenarios from './scenarios';
import Requests from './requests';

class ShredderAPI {

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
    return ShredderStorage.getRaw();
  }

  addScenario(name) {
    Scenarios.addScenario(name);
  }

  renameScenario(scenarioId, newName) {
    Scenarios.renameScenario(scenarioId, newName);
  }

  removeScenario(scenarioId) {
    Scenarios.removeScenario(scenarioId);
  }

  duplicateScenario(scenarioId) {
    Scenarios.duplicateScenario(scenarioId);
  }

  setCurrentScenario(scenarioId) {
    Scenarios.setCurrentScenario(scenarioId);
  }

  getCurrentScenario() {
    return Scenarios.getCurrentScenario();
  }

  mockRequest(request) {
    MockedRequests.addMockedRequest(request);
  }

}

export const API = new ShredderAPI();
