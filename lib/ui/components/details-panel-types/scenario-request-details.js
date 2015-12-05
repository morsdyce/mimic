import React from 'react';

import Toggle from 'react-toggle';
import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { ResponseDetails } from 'ui/components/details-panel/response-details';
import { CurrentState } from 'ui/components/details-panel/current-state';

export class ScenarioRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object,
      requestActive: React.PropTypes.bool,
      onToggleRequest: React.PropTypes.func.isRequired,
      onRemoveFromScenario: React.PropTypes.func.isRequired,
      onSelectState: React.PropTypes.func.isRequired,
      editMockedRequest: React.PropTypes.func.isRequired
    }
  }

  _removeFromScenario() {
    this.props.onRemoveFromScenario(this.props.request.id);
  }

  _selectState(stateId) {
    this.props.onSelectState(this.props.request.id, stateId);
  }

  _toggleRequest() {
    this.props.onToggleRequest(this.props.request.id);
  }

  render() {
    if (!this.props.request) {
      return null;
    }

    return (
      <DetailsPanel>
        <Toggle checked={ this.props.requestActive }
                onChange={ () => this._toggleRequest() }/>

        <RequestDetails request={ this.props.request } readOnly={ true }/>

        <CurrentState mockedRequest={ this.props.request }
                      onStateChange={ this._selectState.bind(this) }
                      editMockedRequest={ this.props.editMockedRequest }/>

        <ResponseDetails response={ this.props.request.getResponse() }
                         readOnly={ true }/>

        <div className="actions">
          <a className="btn" onClick={ () => this._removeFromScenario() }>
            Remove from scenario
          </a>
        </div>
      </DetailsPanel>
    );
  }

}
