import XHRInterceptor from "./interceptor";

class ShredderAPI {

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
