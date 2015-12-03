import { API } from 'api/index';
import React from 'react';

import { ActiveIndicator } from 'ui/components/active-indicator';
import { MethodLabel } from 'ui/components/method-label';
import { StateSelector } from 'ui/components/state-selector';

export class Scenario extends React.Component {

  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  _getRequestModel(requestId) {
    return API.mockedRequests.filter((request) => request.id === requestId)[0];
  }

  _requestsList() {
    return this.props.mockedRequests.map((request) => {
      const requestModel = this._getRequestModel(request.mockedRequestId);

      return (
        <div key={ requestModel.id }>
          <ActiveIndicator active={ request.active }
                           onEnable={ () => {} }
                           onDisable={ () => {} }/>

          <MethodLabel method={ requestModel.method }/>
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
      <div className="scenario">
        <header>
          <h1>{ this.props.name }</h1>

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
      </div>
    );
  }
}
