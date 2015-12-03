import { API } from 'api/index';
import React from 'react';

export class ScenarioName extends React.Component {

  static get propTypes() {
    return {
      scenario: React.PropTypes.object.isRequired,
      onSelectScenario: React.PropTypes.func
    }
  }

  _removeScenario(scenarioId) {
    API.removeScenario(scenarioId);
  }

  _duplicateScenario(scenarioId) {
    API.duplicateScenario(scenarioId);
  }

  _selectScenario(scenarioId) {
    API.setCurrentScenario(scenarioId);

    this.props.onSelectScenario();
  }

  render() {
    const { id, name } = this.props.scenario;

    return (
      <li key={ id } onClick={ this._selectScenario.bind(this, id) }>
        { name }
        <button onClick={ this._duplicateScenario.bind(this, id) }>Duplicate</button>
        <button onClick={ this._removeScenario.bind(this, id) }>Remove</button>
      </li>
    );
  }

}
