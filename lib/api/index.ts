import XHRInterceptor from "./interceptor";

export default class ShredderAPI {

  version: string;
  packageName: string;

  constructor() {
    this.version = '0.0.1';
    this.packageName = 'ShredderAPI'
  }

  sayHello() {
    console.log('Hello API');
  }

}

console.log('API LOADED');

export const API = new ShredderAPI();
