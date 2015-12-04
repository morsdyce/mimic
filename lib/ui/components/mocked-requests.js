import React from 'react';

import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';
import { StateSelector } from 'ui/components/state-selector';
import { RequestRow } from 'ui/components/request-row';

import { MockedRequestDetails } from 'ui/components/details-panel-types/mocked-request-details';

export class MockedRequests extends React.Component {

  static get propTypes() {
    return {
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  constructor(props) {
    super(props);

    this.state = { selectedRequest: null };
  }

  _selectRequest(request) {
    this.setState({ selectedRequest: request });
  }

  _isSelected(requestId) {
    return this.state.selectedRequest
     ? this.state.selectedRequest.id === requestId
     : false;
  }

  _requestsList() {
    return this.props.mockedRequests.map((request) => {
      return (
        <div key={ request.id }
             onClick={ this._selectRequest.bind(this, request) }>
          <RequestRow requestId={ request.id }
                      selected={ this._isSelected(request.id) }>
            <div>
              <ActiveIndicator active={ request.active }
                               onEnable={ () => {} }
                               onDisable={ () => {} } />
              <MethodLabel method={ request.method } />
              <Url url={ request.url }/>
            </div>

            <StateSelector selectedStateId={ request.selectedStateId }
                           states={ request.states }/>
          </RequestRow>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <h2 className="panel-title">All mocked requests</h2>

        { this._requestsList() }

        <MockedRequestDetails request={ this.state.selectedRequest }/>
      </div>
    );
  }
}
