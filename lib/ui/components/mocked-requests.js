import React from 'react';

import { ActiveIndicator } from './active-indicator';
import { MethodLabel } from './method-label';
import { StateSelector } from './state-selector';

export class MockedRequests extends React.Component {

  static get propTypes() {
    return {
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  _requestsList() {
    return this.props.mockedRequests.map((request) => {
      return (
        <div key={ request.id }>
          <ActiveIndicator active={ request.active }
                           onEnable={ () => {} }
                           onDisable={ () => {} } />
          <MethodLabel method={ request.method } />
          { request.url }

          <StateSelector selectedStateId={ request.selectedStateId }
                         states={ request.states }/>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>All mocked requests</h1>

        { this._requestsList() }
      </div>
    );
  }
}
