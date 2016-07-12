import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { PersistentStorage } from 'api/storage';
import { Scenario } from 'api/models/scenario';
import Requests from 'api/requests';

import { flatten } from 'lodash';

export class Scenarios {

  init() {
    this.loadFromStorage();
    this._registerEvents();
  }

  _registerEvents() {
    Emitter.on(EVENTS.SCENARIO_CHANGE, this.loadFromStorage, this);
    Emitter.on(EVENTS.IMPORT, this.loadFromStorage, this);
  }

  loadFromStorage() {
    this.scenarios = PersistentStorage.dataTree.scenarios
      .map((scenario) => new Scenario(scenario));

    PersistentStorage.dataTree.scenarios = this.scenarios;
  }

  getMockedRequests() {
    return flatten(
      this.scenarios
        .filter((scenario) => scenario.active)
        .map((scenario) => scenario.mockedRequests)
    );
  }

  getCurrentMockedRequests() {
    return this.getMockedRequests().filter((request) => request.active);
  }

  getById(scenarioId) {
    return this.scenarios.filter((scenario) => scenario.id === scenarioId)[0];
  }

  getByName(scenarioName) {
    return this.scenarios.filter((scenario) => scenario.name === scenarioName)[0];
  }

  mockRequest(scenarioId, request) {
    const mock = this.getById(scenarioId).mockRequest(request);
    Requests.getById(request.requestId).setMock(mock);

    PersistentStorage.persist();
  }

  updateMockRequest(scenarioId, mockRequestId, request) {
    this.getById(scenarioId).updateMockedRequest(mockRequestId, request);

    PersistentStorage.persist();
  }

  removeMockedRequest(scenarioId, mockedRequestId) {
    this.getById(scenarioId).removeMockedRequest(mockedRequestId);

    PersistentStorage.persist();
  }

  addScenario(name) {
    this.scenarios.push(new Scenario({name}));

    PersistentStorage.persist();
  }

  toggle(id) {
    const scenario = this.getById(id);
    scenario.active = !scenario.active;

    PersistentStorage.persist();
  }

  renameScenario(scenarioId, newName) {
    this.getById(scenarioId).rename(newName);

    PersistentStorage.persist();
  }

  duplicateScenario(scenarioId) {
    const selectedScenario = this.getById(scenarioId);
    let name = `${ selectedScenario.name } copy`;
    while(this.getByName(name)) {
      name = `${ name } copy`;
    }
    const newScenario = {
      name: name,
      mockedRequests: selectedScenario.mockedRequests,
      active: false
    };

    this.scenarios.push(new Scenario(newScenario));

    PersistentStorage.persist();
  }

  removeScenario(scenarioId) {
    const filtered = this.scenarios
      .filter((scenario) => scenario.id !== scenarioId);

    this.scenarios.splice(0, this.scenarios.length);

    filtered.forEach((scenario) => this.scenarios.push(scenario));

    PersistentStorage.persist();
  }

  mergeScenarios(scenarios) {
    for (const scenario of scenarios) {
      const existingScenario = this.getById(scenario.id);

      if (existingScenario) {
        Object.assign(existingScenario, scenario);
      } else {
        this.scenarios.push(new Scenario(scenario));
      }
    }
  }

  toggleMockedRequest(scenarioId, mockedRequestId) {
    this.getById(scenarioId).toggleMockedRequest(mockedRequestId);

    PersistentStorage.persist();
  }
}

export default new Scenarios();
