const STORAGE_KEY = `_bdsm`;

const dataTree = {
  version: '1.0.0',
  mockedRequests: [],
  scenarios: [],
  currentScenario: null
};

export class PersistentStorage {

  constructor() {
    if (!PersistentStorage.getRaw()) {
      PersistentStorage.persist();
    }

    Object.assign(dataTree, PersistentStorage.getSerialized());
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

    PersistentStorage.persist();
  }

  static getRaw() {
    return localStorage.getItem(STORAGE_KEY);
  }

  static getSerialized() {
    return JSON.parse(PersistentStorage.getRaw());
  }

  static get dataTree() {
    return dataTree;
  }

}

new PersistentStorage();
