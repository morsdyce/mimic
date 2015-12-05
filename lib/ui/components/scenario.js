import { API } from 'api/index';
import React from 'react';
import cx from 'classnames';

import { ScenarioHeader } from 'ui/components/scenario-header';
import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';
import { StateSelector } from 'ui/components/state-selector';
import { ScenarioRequestDetails } from 'ui/components/details-panel-types/scenario-request-details';

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

  _requestRowClassName(requestId) {
    const isSelected = this.state.selectedRequest
     ? this.state.selectedRequest.id === requestId
     : false;

    return cx('request-row', { selected: isSelected });
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
             className={ this._requestRowClassName(requestModel.id) }
             onClick={ this._selectRequest.bind(this, requestModel) }>
          <div>
            <ActiveIndicator active={ request.active }
                             onEnable={ () => this._toggleMockedRequest(requestModel.id) }
                             onDisable={ () => this._toggleMockedRequest(requestModel.id) }/>

            <MethodLabel method={ requestModel.method }/>
            <Url url={ requestModel.url }/>
          </div>

          <StateSelector selectedStateId={ request.selectedStateId }
                         onSelectState={ this._selectState.bind(this, requestModel.id) }
                         states={ requestModel.states }/>
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

  render() {
    return (
      <div className="scenario">
        <div className="main-content">
          <ScenarioHeader id={ this.props.id } name={ this.props.name }/>

          { this._requestsList() }
        </div>

        <ScenarioRequestDetails request={ this.state.selectedRequest }
                                onRemoveFromScenario={ this._removeRequestFromScenario.bind(this) }
                                onSelectState={ this._selectState.bind(this) }
                                editMockedRequest={ this.props.editMockedRequest }/>
      </div>
    );
  }
}
