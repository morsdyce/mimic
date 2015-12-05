import { API } from 'api/index';
import React from 'react';

import Toggle from 'react-toggle';

export class ScenarioHeader extends React.Component {

  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }
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

  _toggleScenario() {
    API.setCurrentScenario(
      API.currentScenario === this.props.id ? null : this.props.id
    );
  }

  render() {
    return (
      <header>
        <h2 className="panel-title">
          { this.props.name }
          <Toggle checked={ API.currentScenario === this.props.id }
                  onChange={ this._toggleScenario.bind(this) }/>
        </h2>

        <div className="actions">
          <div className="action"
               onClick={ this._renameScenario.bind(this) }>
            <i className="fa fa-pencil-square-o"></i>
          </div>

          <div className="action"
               onClick={ this._duplicateScenario.bind(this) }>
            <i className="fa fa-files-o"></i>
          </div>

          <div className="action"
               onClick={ this._removeScenario.bind(this) }>
            <i className="fa fa-trash-o"></i>
          </div>
        </div>
      </header>
    );
  }
}
