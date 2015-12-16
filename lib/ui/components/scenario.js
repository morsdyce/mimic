import { API } from 'api/index';
import React from 'react';
import cx from 'classnames';

import { ScenarioHeader } from 'ui/components/scenario-header';
import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';
import { StateSelector } from 'ui/components/state-selector';
import { ScenarioRequestDetails } from 'ui/components/details-panel-types/scenario-request-details';
import { RequestRow } from 'ui/components/request-row';

export class Scenario extends React.Component {

  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      mockedRequests: React.PropTypes.array.isRequired,
      editMockedRequest: React.PropTypes.func.isRequired
    }
  }

  constructor(props) {
    super(props);

    this.state = { selectedRequest: null };
  }

  _getRequestModel(requestId) {
    return API.mockedRequests.filter((request) => request.id === requestId)[0];
  }

  _isSelected(requestId) {
    return this.state.selectedRequest
      ? this.state.selectedRequest.id === requestId
      : false;
  }

  _selectState(mockedRequestId, stateId) {
    API.selectStateInMockedRequestInScenario(this.props.id, mockedRequestId, stateId);
  }

  _toggleMockedRequest(mockedRequestId) {
    API.toggleMockedRequestInScenario(this.props.id, mockedRequestId);
  }

  _requestsList() {
    if (!this.props.mockedRequests.length) {
      return (
        <div className="no-mocked-requests">
          Drag items from Mocked Requests section on scenario names in the sidebar
        </div>
      );
    }

    return this.props.mockedRequests.map((request) => {
      const requestModel = this._getRequestModel(request.mockedRequestId);

      return (
        <div key={ requestModel.id }
             onClick={ this._selectRequest.bind(this, requestModel) }>
          <RequestRow requestId={ requestModel.id }
                      selected={ this._isSelected(requestModel.id) }>
            <div className="request-info">
              <ActiveIndicator active={ requestModel.active }
                               onToggle={ () => this._toggleMockedRequest(requestModel.id) }/>

              <MethodLabel method={ requestModel.method }/>
              <Url url={ requestModel.url }/>
            </div>

            <StateSelector selectedStateId={ request.selectedStateId }
                           onSelectState={ this._selectState.bind(this, requestModel.id) }
                           states={ requestModel.states }/>
          </RequestRow>
        </div>
      );
    })
  }

  _selectRequest(request) {
    this.setState({ selectedRequest: request });
  }

  _removeRequestFromScenario(requestId) {
    API.removeMockedRequestFromScenario(this.props.id, requestId);

    this.setState({ selectedRequest: null });
  }

  _requestActive() {
    if (!this.state.selectedRequest) {
      return false;
    }

    return this.props.mockedRequests
      .filter((request) => request.mockedRequestId === this.state.selectedRequest.id)[0]
      .active;
  }

  render() {
    return (
      <div className="scenario">
        <div className="main-content">
          <ScenarioHeader id={ this.props.id } name={ this.props.name }/>

          { this._requestsList() }
        </div>

        <ScenarioRequestDetails request={ this.state.selectedRequest }
                                requestActive={ this._requestActive() }
                                onToggleRequest={ this._toggleMockedRequest.bind(this) }
                                onRemoveFromScenario={ this._removeRequestFromScenario.bind(this) }
                                onSelectState={ this._selectState.bind(this) }
                                editMockedRequest={ this.props.editMockedRequest }/>
      </div>
    );
  }
}
