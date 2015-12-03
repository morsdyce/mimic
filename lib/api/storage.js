const STORAGE_KEY = `_shredder`;

const dataTree = {
  version: '1.0.0',
  mockedRequests: [],
  scenarios: [],
  currentScenario: null
};

export class ShredderStorage {

  constructor() {
    if (!ShredderStorage.getRaw()) {
      ShredderStorage.persist();
    }

    Object.assign(dataTree, ShredderStorage.getSerialized());
  }

  static persist() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dataTree)
    );

    return true;
  }

  static clear() {
    Object.assign(dataTree, {
      mockedRequests: [],
      scenarios: [],
      currentScenario: null
    });

    ShredderStorage.persist();
  }

  static getRaw() {
    return localStorage.getItem(STORAGE_KEY);
  }

  static getSerialized() {
    return JSON.parse(ShredderStorage.getRaw());
  }

  static get dataTree() {
    return dataTree;
  }

}

new ShredderStorage();
