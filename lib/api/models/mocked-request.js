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
    this.params = request.params;
    this.url = request.url;
    this.headers = Object.assign({}, request.headers);
  }

  toggle() {
    this.active = !this.active;
  }

  matches(request) {
    // Convert the string to regex (replace ? to \?, / to \/ etc.)
    // and replace all '*' with .*
    const preparedRegex = this.prepareRegex(this.url);

    return request.method === this.method &&
           this.matchParams(request.params) &&
           preparedRegex.test(request.url);
  }

  prepareRegex(value) {
    return new RegExp('^' +
      UrlUtils._escapeRegExp(value)
        .replace(/\s/g, '')
        .replace(/\*/g,'.*') + '$');
  }

  matchParams(params) {
    if (this.params === params) {
      return true;
    }

    const emptyMockParams = this.params === undefined || this.params === null || this.params === '';
    const emptyRequestParams = params === undefined || params === null || this.params === '';

    if (emptyMockParams && emptyRequestParams) {
      return true;
    }

    return this.prepareRegex(this.params).test(params);
  }

  export() {
    const mock = Object.assign({}, this);
    const mockHeaders = mock.headers['content-type'] || '';
    if (mockHeaders.indexOf('application/json') > -1) {
      try {
        mock.params = JSON.parse(mock.params);
      } catch (ex) {
        // failed to parse params, reverting to string
      }


      try {
        mock.response.body = JSON.parse(mock.response.body);
      } catch (ex) {
        // failed to parse body, reverting to string
      }
    }

    return mock;
  }

}
