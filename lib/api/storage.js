const STORAGE_KEY = `_mimic`;
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { get } from 'lodash';


let AsyncStorage;
if (get(global, 'isReactNative')) {
  AsyncStorage = global.AsyncStorage;
}

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
    this.getRaw()
      .then((data) => {
        if (!data) {
          dataTree = Object.assign({}, defaultDataTree);
          this.persist();
        }
        this._loadFromStorage();
      });
  }

  _loadFromStorage() {
    this.getSerialized()
      .then((data) => {
        Object.assign(dataTree, data);
        Emitter.emit(EVENTS.STORAGE_PERSIST);
        Emitter.emit(EVENTS.STORAGE_READY);
      });
  }

  persist() {
    if (AsyncStorage) {
      AsyncStorage.setItem(
        this._getStorageKey(),
        JSON.stringify(dataTree)
      );
    } else {
      localStorage.setItem(
        this._getStorageKey(),
        JSON.stringify(dataTree)
      );
    }

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
    return new Promise((resolve, reject) => {
      if (AsyncStorage) {
        AsyncStorage.getItem(this._getStorageKey())
          .then((result) => resolve(result))
      } else {
        resolve(localStorage.getItem(this._getStorageKey()));
      }
    });
  }

  getSerialized() {
    return this.getRaw()
      .then((data) => JSON.parse(data));
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

  getVersion() {
    return dataTree.version;
  }
}

export const PersistentStorage = new PersistentStorageSingleton();

export default PersistentStorage;
