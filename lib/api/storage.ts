export class ShredderStorage {

  constructor() {
    if (!ShredderStorage.getRaw()) {
      ShredderStorage.save({}, null);
    }
  }

  static save(scenarios, currentScenario) {
    const version = '1.0.0';

    localStorage.setItem(
      `${ location.origin }-shredder`,
      JSON.stringify({ version, scenarios, currentScenario })
    );

    return true;
  }

  static getRaw() {
    return localStorage.getItem(`${ location.origin }-shredder`);
  }

  static getSerialized() {
    return JSON.stringify(ShredderStorage.getRaw());
  }

}
