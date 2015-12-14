import { API } from 'api';
import React from 'react';

import Toggle from 'react-toggle';
import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';
import { StateSelector } from 'ui/components/state-selector';
import { RequestRow } from 'ui/components/request-row';

import { MockedRequestDetails } from 'ui/components/details-panel-types/mocked-request-details';

export class MockedRequests extends React.Component {

  static get propTypes() {
    return {
      mockedRequests: React.PropTypes.array.isRequired,
      editedMockedRequestId: React.PropTypes.string
    }
  }

  constructor(props) {
    super(props);

    const editedRequest = this.props.mockedRequests
      .filter((request) => request.id === this.props.editedMockedRequestId)[0];

    this.state = {selectedRequest: editedRequest};
  }

  _selectRequest(request) {
    this.setState({selectedRequest: request});
  }

  _isSelected(requestId) {
    return this.state.selectedRequest
      ? this.state.selectedRequest.id === requestId
      : false;
  }

  _unmockRequest(mockedRequestId) {
    API.unmockRequest(mockedRequestId);
    this.setState({selectedRequest: null});
  }

  _selectState(mockedRequestId, stateId) {
    API.selectStateInMockedRequest(mockedRequestId, stateId);
  }

  _toggleMockedRequest(mockedRequestId) {
    API.toggleMockedRequest(mockedRequestId);
  }

  _requestsList() {
    if (!this.props.mockedRequests.length) {
      return (
        <div className="no-mocked-requests">
          Add mocked requests here from Captured Requests section
        </div>
      );
    }

    this.props.mockedRequests[0].url = 'http://ws.tradencytests.com/SI_WS/Positions/GetOpenPositions/AndSomeMoreShitInHere';
    return this.props.mockedRequests.map((request) => {
      return (
        <div key={ request.id }
             onClick={ this._selectRequest.bind(this, request) }>
          <RequestRow requestId={ request.id }
                      selected={ this._isSelected(request.id) }>
            <div className="request-info">
              <ActiveIndicator active={ request.active }
                               onToggle={ () => this._toggleMockedRequest(request.id) }/>
              <MethodLabel method={ request.method }/>
              <Url url={ request.url }/>
            </div>

            <StateSelector selectedStateId={ request.selectedStateId }
                           onSelectState={ this._selectState.bind(this, request.id) }
                           states={ request.states }/>
          </RequestRow>
        </div>
      );
    })
  }

  _toggleMockedrequests() {
    API.setCurrentScenario(
      API.currentScenario === 'MockedRequests' ? null : 'MockedRequests'
    );
  }

  render() {
    return (
      <div className="mocked-requests flex">
        <div className="main-content">
          <h2 className="panel-title">
            All mocked requests
            <Toggle checked={ API.currentScenario === 'MockedRequests' }
                    onChange={ this._toggleMockedrequests.bind(this) }/>
          </h2>

          { this._requestsList() }

        </div>

        <MockedRequestDetails request={ this.state.selectedRequest }
                              onToggleRequest={ this._toggleMockedRequest.bind(this) }
                              onUnmock={ this._unmockRequest.bind(this) }/>
      </div>
    );
  }
}
