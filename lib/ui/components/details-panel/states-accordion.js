import { API } from 'api';
import React from 'react';
import { MockedRequestState } from 'api/models/mocked-request-state';

import { ResponseDetails } from 'ui/components/details-panel/response-details';

export class StatesAccordion extends React.Component {

  static get propTypes() {
    return {
      mockedRequest: React.PropTypes.object.isRequired
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      states: this.props.mockedRequest.states
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ states: newProps.mockedRequest.states})
  }

  _createState() {
    const newState = {
      name: 'New State',
      response: {
        status: 200,
        delay: 0,
        headers: '{}',
        body: ''
      }
    };

    API.addStateToMockedRequest(this.props.mockedRequest.id, newState);
  }

  _removeState(stateId) {
    API.removeStateFromMockedRequest(this.props.mockedRequest.id, stateId);
  }

  _updateState(stateId) {
    // TODO: Implement update state
    API.updateStateInMockedRequest(this.props.mockedRequest.id, stateId, {
      name: 'TEMP',
      response: {}
    });
  }

  _expandState(stateId) {
    this.state.states.forEach((state) => state.expanded = false);

    this.state.states
      .filter((state) => state.id === stateId)[0]
      .expanded = true;

    this.forceUpdate();
  }

  _section(state) {
    if (!state.expanded) {
      return (
        <div key={ state.id } onClick={ this._expandState.bind(this, state.id)}>
          { state.name }
        </div>
      );
    }

    return (
      <div key={ state.id }>
        <input type="text" defaultValue={ state.name }/>

        <ResponseDetails response={ state.response }/>

        <button onClick={ this._updateState.bind(this, state.id) }>Save</button>
        <button onClick={ this._removeState.bind(this, state.id) }>Remove State</button>
      </div>
    );
  }

  _accordion() {
    return this.state.states.map((state) => this._section(state));
  }

  render() {
    return (
      <div>
        { this._accordion() }
        <div onClick={ this._createState.bind(this) }>+ Create new state</div>
      </div>
    );
  }

}
