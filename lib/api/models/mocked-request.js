import uuid from 'uuid';
import { MockedRequestState } from './mocked-request-state';

export class MockedRequest {

  constructor({ id = uuid.v4(), method, url, headers, params, requestHash, states }) {
    Object.assign(this, { id, requestHash, method, url, headers, params });

    this._buildStates(states);
  }

  _buildStates(states) {
    this.states = states.map((state) => new MockedRequestState(state));
  }

  update({ request, response }) {
    Object.assign(this, { request, response });
  }

}
