import { API } from 'api/index';
import React from 'react';
import cx from 'classnames';

import Toggle from 'react-toggle';
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
                             onEnable={ () => {} }
                             onDisable={ () => {} }/>

            <MethodLabel method={ requestModel.method }/>
            <Url url={ requestModel.url }/>
          </div>

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

  _selectRequest(request) {
    this.setState({ selectedRequest: request });
  }

  _removeRequestFromScenario(requestId) {
    API.removeMockedRequestFromScenario(this.props.id, requestId);

    this.setState({ selectedRequest: null });
  }

  _toggleScenario() {
    API.setCurrentScenario(
      API.currentScenario === this.props.id ? null : this.props.id
    );
  }

  render() {
    return (
      <div className="scenario">
        <header>
          <h2 className="panel-title">
            { this.props.name }
            <Toggle checked={ API.currentScenario === this.props.id }
                    onChange={ this._toggleScenario.bind(this) }/>
          </h2>

          <div className="actions">
            <div className="action" onClick={ this._renameScenario.bind(this) }>
              <i className="fa fa-pencil-square-o"></i>
            </div>

            <div className="action"
                 onClick={ this._duplicateScenario.bind(this) }>
              <i className="fa fa-files-o"></i>
            </div>

            <div className="action" onClick={ this._removeScenario.bind(this) }>
              <i className="fa fa-trash-o"></i>
            </div>
          </div>
        </header>

        { this._requestsList() }

        <ScenarioRequestDetails request={ this.state.selectedRequest }
                                onRemoveFromScenario={ this._removeRequestFromScenario.bind(this) }
                                editMockedRequest={ this.props.editMockedRequest }/>
      </div>
    );
  }
}
