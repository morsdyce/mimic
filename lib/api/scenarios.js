import { ShredderStorage } from './storage';
import { Scenario } from './models/scenario';

export class Scenarios {

  constructor() {
    this.scenarios = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    const fromStorage = ShredderStorage.dataTree;

    fromStorage.scenarios.forEach((scenario) => {
      this.scenarios.push(new Scenario(scenario));

      this.setCurrentScenario(fromStorage.currentScenario);
    });
  }

  setCurrentScenario(scenarioId) {
    this.currentScenario = scenarioId ? this.getById(scenarioId) : null;
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
