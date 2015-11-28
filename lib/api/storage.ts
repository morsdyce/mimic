export class ShredderStorage {

  constructor() {
    if (!ShredderStorage.rawData()) {
      ShredderStorage.saveScenarios({});
    }
  }

  static saveScenarios(scenarios) {
    const version = '1.0.0';

    localStorage.setItem(
      `${ location.origin }-shredder`,
      JSON.stringify({ version, scenarios })
    );

    return true;
  }

  static rawData() {
    return localStorage.getItem(`${ location.origin }-shredder`);
  }

  static getAllScenarios() {
    return JSON.parse(ShredderStorage.rawData()).scenarios;
  }

  static getEnabledScenarios() {
    return ShredderStorage.getAllScenarios()
      .filter((scenario) => scenario.enabled);
  }

  static getScenario(scenarioId) {
    return ShredderStorage.getAllScenarios()
      .filter((scenario) => scenario.id === scenarioId)[0];
  }

}
