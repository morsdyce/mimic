const STORAGE_KEY = `_mimic`;
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { migrateData } from 'api/migrations';
import get from 'lodash/get';
import assign from 'lodash/assign';

let AsyncStorage;
if (get(global, 'isReactNative')) {
  AsyncStorage = global.AsyncStorage;
}

const defaultDataTree = {
  version: '2.0.0',
  mocks: [],
  groups: []
};

let dataTree = assign({}, defaultDataTree);

class PersistentStorageSingleton {

  constructor() {
    this.appName = ''; // Use empty string to be backwards compatible
  }

  init() {
    this.getRaw()
      .then((data) => {
        if (!data) {
          dataTree = assign({}, defaultDataTree);
          this.persist();
        }
        this._loadFromStorage();
      });
  }

  _loadFromStorage() {
    this.getSerialized()
      .then((data) => {
        assign(dataTree, data);
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
    assign(dataTree, {
      mocks: []
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
      .then((data) => {
        const dataTree = JSON.parse(data);
        return migrateData(dataTree);
      });
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
