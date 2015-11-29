import API from 'api/index';
import { ShredderStorage } from "api/storage";

class ShredderUI {

  version:string;
  packageName:string;
  api:API;

  constructor() {
    this.version = '0.0.1';
    this.packageName = 'ShredderUI';

    this.api = new API();
    this.api.sayHello();
  }

  exportScenarios() {
    const blob = new Blob(
        [ShredderStorage.getRaw()],
        { type: 'application/json' }
    );

    let link = document.createElement('a');

    link.download = 'scenarios.json';
    link.href     = URL.createObjectURL(blob);

    link.click();
    link.remove();

    link = undefined;
  }

  importScenarios() {
    // TODO: Implement import from file
  }

}

export default function bootstrapUI() {
  return new ShredderUI();
}

console.log('UI LOADED');
