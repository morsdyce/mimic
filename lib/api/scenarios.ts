import { ShredderStorage } from './storage';
import { Scenario } from './models/scenario';

export class Scenarios {

  public scenarios = [];
  public currentScenario;

  constructor() {
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
    const currentScenarioId   = this.currentScenario.id;

    ShredderStorage.save(this.scenarios, currentScenarioId);
    return true;
  }

  getById(scenarioId) {
    return this.scenarios.filter((scenario) => scenario.id === scenarioId)[0];
  }
}
