import API from 'api/index';

class ShredderUI {

  version:string;
  packageName:string;
  API:API;

  constructor() {
    this.version = '0.0.1';
    this.packageName = 'ShredderUI';

    this.API = new API();
    this.API.sayHello();
  }

}

export default function bootstrapUI() {
  return new ShredderUI();
}

console.log('UI LOADED');
