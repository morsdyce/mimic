import React from 'react';
import { MockedRequestState } from 'api/models/mocked-request-state';

import { ResponseDetails } from 'ui/components/details-panel/response-details';

export class StatesAccordion extends React.Component {

  static get propTypes() {
    return {
      mockedRequest: React.PropTypes.object.isRequired,
      onRenameState: React.PropTypes.func.isRequired,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      states: this.props.mockedRequest.states
    }
  }

  _createState() {
    const newState = new MockedRequestState({
      name: 'New State',
      response: {
        status: 200,
        delay: 0,
        headers: '{}',
        body: ''
      }
    });

    this.state.states.push(newState);
    this._expandState(newState.id)
  }

  _renameState(stateId, event) {
    this.props.onRenameState(stateId, event.target.value);
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
        <input type="text"
               onChange={ this._renameState.bind(this, state.id) }
               value={ state.name }/>

        <ResponseDetails response={ state.response }/>
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
