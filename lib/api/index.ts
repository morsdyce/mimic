import { ShredderStorage } from "./storage";

export default class ShredderApi {

  version:string;
  packageName:string;

  constructor() {
    this.version = '0.0.1';
    this.packageName = 'ShredderApi'
  }

  sayHello() {
    console.log('Hello API');
  }

  exportScenarios() {
    const blob = new Blob(
      [ShredderStorage.rawData()],
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

console.log('API LOADED');

export const api = new ShredderApi();
