import uuid from 'uuid';
import { MockedRequestState } from './mocked-request-state';

export class MockedRequest {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, requestHash, states, selectedStateId }) {
    Object.assign(this, { id, active, requestHash, method, url, headers, params });

    this._buildStates(states, selectedStateId);
  }

  _buildStates(states, selectedStateId) {
    this.states          = states.map((state) => new MockedRequestState(state));
    this.selectedStateId = selectedStateId || this.states[0].id;
  }

  update({ request, response }) {
    Object.assign(this, { request, response });
  }

}
