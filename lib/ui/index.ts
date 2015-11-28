import API from 'api/index';

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

}

export default function bootstrapUI() {
  return new ShredderUI();
}

console.log('UI LOADED');
