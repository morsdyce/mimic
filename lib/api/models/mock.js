import uuid from 'uuid';
import { UrlUtils } from 'api/utils/url';
import cloneDeep from 'lodash/cloneDeep';
import Groups from 'api/groups';
import { request } from 'ui/utils/request';

const DEFAULT_RESPONSE = {
  status: 200,
  delay: 500,
  headers: {
    'content-type': 'application/json'
  },
  body: ''
};

// Convert the string to regex (replace ? to \?, / to \/ etc.)
// and replace all '*' with .*
const toRegExp = (value) => {
  const expression = UrlUtils._escapeRegExp(value)
    .replace(/\s/g, '')
    .replace(/\*/g, '.*');

  return new RegExp(`^${expression}$`);
};

export class Mock {

  constructor({ id, active = true, method, url, headers, params, response, name, origin, groupId }) {
    Object.assign(this, {
      id: id || uuid.v4(),
      active,
      method,
      url,
      headers,
      params,
      response: response || DEFAULT_RESPONSE,
      name,
      origin,
      groupId
    });
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

  get isActive() {
    if (!this.groupId) {
      return this.active;
    }

    const group = Groups.find({ id: this.groupId }) || {};

    return group.active ? this.active : group.active;
  }

  get requestHash() {
    return [this.method, this.url, this.params].join('|');
  }

  getResponse() {
    return { headers: this.headers, ...this.response };
  }

  update(request) {
    this.response.status  = request.response.status;
    this.response.delay   = request.response.delay;
    this.response.body    = request.response.body;
    this.response.headers = { ...request.response.headers };
    this.active           = request.active;
    this.name             = request.name;
    this.params           = request.params;
    this.url              = request.url;
    this.method           = request.method;
    this.headers          = { ...request.headers };
    this.groupId          = request.groupId;
  }

  updateResponse(response) {
    this.response.status = response.status || this.response.status;
    this.response.delay  = response.delay || this.response.delay;
    this.response.body   = response.body || this.response.body;
  }

  recapture(done) {
    this.disable();

    request({
      method: this.method,
      url: this.url,
      headers: this.headers,
      params: this.params
    }, (response) => {
      this.updateResponse(response);
      this.enable();
      done(this.id);
    });
  }

  rename(newName) {
    this.name = newName;
  }

  toggle() {
    this.active = !this.active;
  }

  enable() {
    this.active = true;
  }

  disable() {
    this.active = false;
  }

  matches(request) {
    const preparedRegex = toRegExp(this.url);

    const methodMatches = request.method.toLowerCase() === this.method.toLowerCase();

    return methodMatches &&
      this.matchParams(request.params) &&
      preparedRegex.test(request.url);
  }

  matchParams(params) {
    if (this.params === params) {
      return true;
    }

    const emptyMockParams    = this.params === undefined || this.params === null || this.params === '' || this.params === 'null';
    const emptyRequestParams = params === undefined || params === null || params === '' || params === 'null';

    if (emptyMockParams && emptyRequestParams) {
      return true;
    }

    const strippedParams = params.replace(/\s/g, '');

    return toRegExp(this.params).test(strippedParams);
  }

  export() {
    const mock = cloneDeep(this);

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
