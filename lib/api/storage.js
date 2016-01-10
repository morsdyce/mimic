const STORAGE_KEY = `_bdsm`;
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import semver from 'semver';
import { migrateData } from 'api/migrations';

const dataTree = {
  version: '1.0.1',
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
    const data = this.getSerialized();
    
    if (semver.lt(data.version, dataTree.version)) {
      const newData = migrateData(data);
      Object.assign(dataTree, newData);
      this.persist();
      return;
    }

    Object.assign(dataTree, data);
  }

  persist() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dataTree)
    );

    Emitter.emit(EVENTS.STORAGE_PERSIST);
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

  getSerialized() {
    return JSON.parse(this.getRaw());
  }

  get dataTree() {
    return dataTree;
  }

}

export default { PersistentStorage: new PersistentStorageSingleton() };
