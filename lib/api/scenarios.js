import { ShredderStorage } from './storage';
import { Scenario } from './models/scenario';

export class Scenarios {

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.scenarios = ShredderStorage.dataTree.scenarios
      .map((scenario) => new Scenario(scenario));

    ShredderStorage.dataTree.scenarios = this.scenarios;

    this.setCurrentScenario(ShredderStorage.dataTree.currentScenario);
  }

  setCurrentScenario(scenarioId) {
    this.currentScenario = scenarioId ? this.getById(scenarioId) : null;

    ShredderStorage.dataTree.currentScenario = scenarioId;
  }

  getById(scenarioId) {
    return this.scenarios.filter((scenario) => scenario.id === scenarioId)[0];
  }

  addRuleToScenario(scenarioId, capturedRequest) {
    this.getById(scenarioId).addRule(capturedRequest);

    ShredderStorage.persist();
  }

  addScenario(name) {
    this.scenarios.push(new Scenario({ name }));
    ShredderStorage.persist();
  }

  duplicateScenario(scenarioId) {
    const selectedScenario = this.getById(scenarioId);

    const newScenario = {
      name: `${ selectedScenario.name } copy`,
      rules: selectedScenario.rules,
    };

    this.scenarios.push(new Scenario(newScenario));

    ShredderStorage.persist();
  }

  removeScenario(scenarioId) {
    this.scenarios = this.scenarios
      .filter((scenario) => scenario.id !== scenarioId);

    ShredderStorage.persist();
  }

  updateRuleInScenario(scenarioId, ruleId, request, response) {
    this.getById(scenarioId).updateRule(ruleId, request, response);

    ShredderStorage.persist();
  }
}

export default new Scenarios();
