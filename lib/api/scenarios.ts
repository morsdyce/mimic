import { ShredderStorage } from './storage';
import { Scenario } from './models/scenario';
import { Rule } from './models/rule';

export class Scenarios {

  public scenarios = [];
  public currentScenario;

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const fromStorage = ShredderStorage.getSerialized();

    fromStorage.scenarios.forEach((scenario) => {
      const { id, name } = scenario;
      const rules = [];

      scenario.rules.forEach((rule) => rules.push(new Rule(rule)));

      this.scenarios.push(new Scenario({ id, name, rules }));

      this.setCurrentScenario(fromStorage.currentScenario);
    });
  }

  setCurrentScenario(scenarioId) {
    this.currentScenario = scenarioId ? this.getById(scenarioId) : null;
  }

  saveToStorage() {
    const currentScenarioId   = this.currentScenario.id;
    const serializedScenarios = JSON.stringify(this.scenarios);

    ShredderStorage.save(serializedScenarios, currentScenarioId);
    return true;
  }

  getById(scenarioId) {
    return this.scenarios.filter((scenario) => scenario.id === scenarioId)[0];
  }
}
