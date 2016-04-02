import uuid from 'uuid';
import { UrlUtils } from 'api/utils/url';

export class MockedRequest {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, response }) {
    Object.assign(this, { id, active, method, url, headers, params, response });
  }

  getRequestHash() {
    return [this.method, this.url, this.params].join('|');
  }

  getResponse() {
    return { headers: this.headers, ...this.response };
  }

  update(request) {
    this.response.status = request.response.status;
    this.response.delay = request.response.delay;
    this.response.body = request.response.body;
    this.url = request.url;
    this.headers = Object.assign({}, request.headers);
  }

  toggle() {
    this.active = !this.active;
  }

  matches(request) {
    // Convert the string to regex (replace ? to \?, / to \/ etc.)
    // and replace all '*' with .*
    const preparedRegex = new RegExp('^' +
     UrlUtils._escapeRegExp(this.url)
     .replace(/\*/g,'*.') + '$');

    return request.method === this.method &&
           request.params === this.params &&
           preparedRegex.test(request.url);
  }

}