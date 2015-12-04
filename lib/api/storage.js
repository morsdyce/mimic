const STORAGE_KEY = `_bdsm`;

const dataTree = {
  version: '1.0.0',
  mockedRequests: [],
  scenarios: [],
  currentScenario: 'MockedRequests'
};

class PersistentStorageSingleton {

  constructor() {
    if (!this.getRaw()) {
      this.persist();
    }
    this._loadFromStorage();
  }

  _loadFromStorage() {
    Object.assign(dataTree, this.getSerialized());
  }

  persist() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dataTree)
    );

    return true;
  }

  clear() {
    Object.assign(dataTree, {
      mockedRequests: [],
      scenarios: [],
      currentScenario: 'MockedRequests'
    });

    this.persist();
  }

  getRaw() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setRaw(rawData) {
    localStorage.setItem(
      STORAGE_KEY,
      rawData
    );
    this._loadFromStorage();
  }

  getSerialized() {
    return JSON.parse(this.getRaw());
  }

  get dataTree() {
    return dataTree;
  }

}

export default { PersistentStorage: new PersistentStorageSingleton() };
