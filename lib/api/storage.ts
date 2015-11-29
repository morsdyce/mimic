export class ShredderStorage {

  static storageKey = `_shredder`;

  constructor() {
    if (!ShredderStorage.getRaw()) {
      ShredderStorage.save({}, null);
    }
  }

  static save(scenarios, currentScenario) {
    const version = '1.0.0';

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({ version, scenarios, currentScenario })
    );

    return true;
  }

  static getRaw() {
    return localStorage.getItem(this.storageKey);
  }

  static getSerialized() {
    return JSON.stringify(this.getRaw());
  }

  static getParsed() {
    return JSON.parse(this.getRaw());
  }

}
