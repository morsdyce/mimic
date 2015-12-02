import { API } from 'api/index';
import React from 'react';

import { ActiveIndicator } from './active-indicator';
import { MethodLabel } from './method-label';
import { StateSelector } from './state-selector';

export class Scenario extends React.Component {

  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  _requestsList() {
    const mockedRequests = {};

    this.props.mockedRequests.forEach((mockedRequest) => {
      mockedRequests[mockedRequest.id] = API.requests
        .filter((request) => request.id === mockedRequest.id)[0];
    });

    return this.props.mockedRequests.map((request) => {
      const requestModel = mockedRequests[request];

      return (
        <div key={ request.id }>
          <ActiveIndicator active={ request.active }
                           onEnable={ () => {} }
                           onDisable={ () => {} } />
          <MethodLabel method={ requestModel.method } />
          { requestModel.url }

          <StateSelector selectedStateId={ requestModel.selectedStateId }
                         states={ requestModel.states }/>
        </div>
      );
    })
  }

  _renameScenario() {
    const newName = prompt('Please enter a new scenario name');

    API.renameScenario(this.props.id, newName);
  }

  _removeScenario() {
    API.removeScenario(this.props.id);
  }

  _duplicateScenario() {
    API.duplicateScenario(this.props.id);
  }

  render() {
    return (
      <div>
        <h1>{ this.props.name }</h1>

        <button onClick={ this._renameScenario.bind(this) }>Rename</button>
        <button onClick={ this._duplicateScenario.bind(this) }>Duplicate</button>
        <button onClick={ this._removeScenario.bind(this) }>Remove</button>

        { this._requestsList() }
      </div>
    );
  }
}
