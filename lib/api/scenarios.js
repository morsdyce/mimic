import { ShredderStorage } from './storage';
import { Scenario } from './models/scenario';

export class Scenarios {

  constructor() {
    this.scenarios = [];
    this.loadFromStorage();
  }

  loadFromStorage() {
    const fromStorage = ShredderStorage.getSerialized();

    fromStorage.scenarios.forEach((scenario) => {
      this.scenarios.push(new Scenario(scenario));

      this.setCurrentScenario(fromStorage.currentScenario);
    });
  }

  setCurrentScenario(scenarioId) {
    this.currentScenario = scenarioId ? this.getById(scenarioId) : null;
  }

  saveToStorage() {
    const currentScenarioId = this.currentScenario.id;

    ShredderStorage.save(this.scenarios, currentScenarioId);
    return true;
  }

  getById(scenarioId) {
    return this.scenarios.filter((scenario) => scenario.id === scenarioId)[0];
  }

  addRuleToScenario(scenarioId, capturedRequest) {
    this.getById(scenarioId).addRule(capturedRequest);

    this.saveToStorage();
  }

  addScenario(name) {
    this.scenarios.push(new Scenario({ name }));
    this.saveToStorage();
  }

  duplicateScenario(scenarioId) {
    const selectedScenario = this.getById(scenarioId);

    const newScenario = {
      name: `${ selectedScenario.name } copy`,
      rules: selectedScenario.rules,
    };

    this.scenarios.push(new Scenario(newScenario));

    this.saveToStorage();
  }

  removeScenario(scenarioId) {
    this.scenarios = this.scenarios
      .filter((scenario) => scenario.id !== scenarioId);

    this.saveToStorage();
  }

  updateRuleInScenario(scenarioId, ruleId, request, response) {
    this.getById(scenarioId).updateRule(ruleId, request, response);

    this.saveToStorage();
  }
}

export default new Scenarios();
