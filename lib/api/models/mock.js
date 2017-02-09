import uuid from 'uuid';
import { UrlUtils } from 'api/utils/url';

// Convert the string to regex (replace ? to \?, / to \/ etc.)
// and replace all '*' with .*
const toRegExp = (value) => {
  const expression = UrlUtils._escapeRegExp(value)
    .replace(/\s/g, '')
    .replace(/\*/g, '.*');

  return new RegExp(`^${expression}$`);
};

export class Mock {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, response, name, origin }) {
    Object.assign(this, { id, active, method, url, headers, params, response, name, origin });
  }

  get fullUrl() {
    const isFullUrl      = this.url.indexOf('http://') !== -1 || this.url.indexOf('https://') !== -1;
    const hasOrigin      = !!this.origin;
    const includesOrigin = this.url.indexOf(this.origin) !== -1;

    if (isFullUrl || !hasOrigin || !includesOrigin) {
      return this.url;
    }

    return `${this.origin}/${this.url}`;
  }

  getRequestHash() {
    return [this.method, this.url, this.params].join('|');
  }

  getResponse() {
    return { headers: this.headers, ...this.response };
  }

  update(request) {
    this.response.status = request.response.status;
    this.response.delay  = request.response.delay;
    this.response.body   = request.response.body;
    this.active          = request.active;
    this.name            = request.name;
    this.params          = request.params;
    this.url             = request.url;
    this.headers         = Object.assign({}, request.headers);
  }

  toggle() {
    this.active = !this.active;
  }

  matches(request) {
    const preparedRegex = toRegExp(this.url);

    return request.method === this.method &&
           this.matchParams(request.params) &&
           preparedRegex.test(request.url);
  }

  matchParams(params) {
    if (this.params === params) {
      return true;
    }

    const emptyMockParams    = this.params === undefined || this.params === null || this.params === '';
    const emptyRequestParams = params === undefined || params === null || this.params === '';

    if (emptyMockParams && emptyRequestParams) {
      return true;
    }

    return toRegExp(this.params).test(params);
  }

  export() {
    const mock = Object.assign({}, this);

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

    return mock;
  }

}
