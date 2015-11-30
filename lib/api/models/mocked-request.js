import uuid from 'uuid';
import { MockedRequestState } from './mocked-request-state';

export class MockedRequest {

  constructor({ id = uuid.v4(), request, requestHash, states }) {
    const { method, url, headers, params } = request;

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
