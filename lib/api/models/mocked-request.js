import uuid from 'uuid';
import { MockedRequestState } from 'api/models/mocked-request-state';

export class MockedRequest {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, requestHash, states, selectedStateId }) {
    Object.assign(this, { id, active, requestHash, method, url, headers, params });

    this._buildStates(states, selectedStateId);
  }

  _buildStates(states, selectedStateId) {
    this.states          = states.map((state) => new MockedRequestState(state));
    this.selectedStateId = selectedStateId || this.states[0].id;
  }

  getResponse(selectedStateId = this.selectedStateId) {
    return this.findStateById(selectedStateId).response;
  }

  findStateById(stateId) {
    return this.states
      .filter((state) => state.id === stateId)[0];
  }

  addState({ name, response }) {
    this.states.push(new MockedRequestState({ name, response }));
  }

  removeState(stateId) {
    this.states.forEach((state, index) => {
      if (state.id === stateId) {
        return this.states.splice(index, 1);
      }
    });
  }

  updateState(stateId, { name, response }) {
    this.findStateById(stateId).update({ name, response });
  }

}
