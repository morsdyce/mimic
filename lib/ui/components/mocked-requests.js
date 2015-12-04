import React from 'react';

import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { StateSelector } from 'ui/components/state-selector';
import { RequestRow } from 'ui/components/request-row';

export class MockedRequests extends React.Component {

  static get propTypes() {
    return {
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  _requestsList() {
    return this.props.mockedRequests.map((request) => {
      return (
        <RequestRow key={ request.id }
                    requestId={ request.id }>
          <div>
            <ActiveIndicator active={ request.active }
                             onEnable={ () => {} }
                             onDisable={ () => {} } />
            <MethodLabel method={ request.method } />
            { request.url }
          </div>

          <StateSelector selectedStateId={ request.selectedStateId }
                         states={ request.states }/>
        </RequestRow>
      );
    })
  }

  render() {
    return (
      <div>
        <h2 className="panel-title">All mocked requests</h2>

        { this._requestsList() }
      </div>
    );
  }
}
