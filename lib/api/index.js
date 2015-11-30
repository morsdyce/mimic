import XHRInterceptor from './interceptor';
import Requests from './requests';

class ShredderAPI {

  constructor() {
    this.version = '0.0.1';
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

}

export const API = new ShredderAPI();
