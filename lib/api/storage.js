const STORAGE_KEY = `_shredder`;

export class ShredderStorage {

  constructor() {
    if (!ShredderStorage.getRaw()) {
      ShredderStorage.save([], null);
    }
  }

  static save(scenarios, currentScenario) {
    const version = '1.0.0';

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version, scenarios, currentScenario })
    );

    return true;
  }

  static getRaw() {
    return localStorage.getItem(STORAGE_KEY);
  }

  static getSerialized() {
    return JSON.parse(ShredderStorage.getRaw());
  }

}

new ShredderStorage();
