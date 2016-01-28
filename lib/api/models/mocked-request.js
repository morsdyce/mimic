import uuid from 'uuid';
import { MockedRequestState } from 'api/models/mocked-request-state';
import { UrlUtils } from 'api/utils/url';

export class MockedRequest {

  constructor({ id = uuid.v4(), active = true, method, url, headers, params, states, selectedStateId }) {
    Object.assign(this, { id, active, method, url, headers, params });

    this._buildStates(states, selectedStateId);
  }

  getRequestHash() {
    return [this.method, this.url, this.params].join('|');
  }

  _buildStates(states, selectedStateId) {
    this.states          = states.map((state) => new MockedRequestState(state));
    this.selectedStateId = selectedStateId || this.states[0].id;
  }

  getCurrentState() {
    return this.findStateById(this.selectedStateId);
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

  selectState(stateId) {
    this.selectedStateId = stateId;
  }

  toggle() {
    this.active = !this.active;
  }


  matches(request) {

    // Convert the string to regex (replace ? to \?, / to \/ etc.)
    // and replace all '*' with .*
    const preparedRegex = new RegExp(
      UrlUtils._escapeRegExp(this.url)
      .replace(/\*/g,'.*'));

    return request.method === this.method &&
           request.params === this.params &&
           preparedRegex.test(request.url);
  }

}