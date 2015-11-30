import XHRInterceptor from './interceptor';
import MockedRequests from './mocked-requests';
import Scenarios from './scenarios';
import Requests from './requests';

class ShredderAPI {

  constructor() {
    this.version = '0.0.1';
  }

  get capturedRequests() {
    return Requests.capturedRequests;
  }

  get mockedRequests() {
    return MockedRequests.mockedRequests;
  }

  get scenarios() {
    return Scenarios.scenarios;
  }

}

export const API = new ShredderAPI();
