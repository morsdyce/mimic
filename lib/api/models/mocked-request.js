import uuid from 'uuid';
import { MockedRequestState } from 'api/models/mocked-request-state';
import { UrlUtils } from 'api/utils/url';

export class MockedRequest {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, response }) {
    Object.assign(this, { id, active, method, url, headers, params, response });
  }

  getRequestHash() {
    return [this.method, this.url, this.params].join('|');
  }

  getResponseBody() {
    return this.response.body;
  }

  toggle() {
    this.active = !this.active;
  }

  matches(request) {
    // Convert the string to regex (replace ? to \?, / to \/ etc.)
    // and replace all '*' with .*
    //const preparedRegex = new RegExp(
    //  UrlUtils._escapeRegExp(this.url)
    //  .replace(/\*/g,'.*'));

    return request.method === this.method &&
           request.params === this.params &&
           request.url    === this.url;
           //preparedRegex.test(request.url);
  }

}