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

}

console.log('API LOADED');

export const api = new ShredderApi();
