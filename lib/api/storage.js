const STORAGE_KEY = `_bdsm`;
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';

const defaultDataTree = {
  version: '1.0.2',
  scenarios: [{ id: 'default-scenario', name: 'Default Scenario', active: true }]
};

let dataTree = Object.assign({}, defaultDataTree);

class PersistentStorageSingleton {

  constructor() {
    this.appName = ''; // Use empty string to be backwards compatible
  }

  init() {
    if (!this.getRaw()) {
      dataTree = Object.assign({}, defaultDataTree);
      this.persist();
    }
    this._loadFromStorage();
  }

  _loadFromStorage() {
    const data = this.getSerialized();

    Object.assign(dataTree, data);
  }

  persist() {
    localStorage.setItem(
      this._getStorageKey(),
      JSON.stringify(dataTree)
    );

    Emitter.emit(EVENTS.STORAGE_PERSIST);
    return true;
  }

  clear() {
    Object.assign(dataTree, {
      scenarios: []
    });

    this.persist();
  }

  getRaw() {
    return localStorage.getItem(this._getStorageKey());
  }

  getSerialized() {
    return JSON.parse(this.getRaw());
  }

  _getStorageKey() {
    return [STORAGE_KEY, this.appName].join('_')
  }

  get dataTree() {
    return dataTree;
  }

  getAppName() {
    return this.appName;
  }

  setAppName(appName) {
    return this.appName = appName;
  }
}

export default { PersistentStorage: new PersistentStorageSingleton() };
