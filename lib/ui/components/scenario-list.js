import { API } from 'api/index';
import React from 'react';

export class ScenarioList extends React.Component {

  static get propTypes() {
    return {
      onSelect: React.PropTypes.func.isRequired
    };
  }

  _addScenario() {
    const name = prompt('Please enter scenario name');

    API.addScenario(name);
  }

  _removeScenario(scenarioId) {
    API.removeScenario(scenarioId);
  }

  _duplicateScenario(scenarioId) {
    API.duplicateScenario(scenarioId);
  }

  _selectScenario(scenarioId) {
    API.setCurrentScenario(scenarioId);

    this.props.onSelect();
  }

  _scenarios() {
    return API.scenarios.map((scenario) => {
      return (
        <li key={ scenario.id } onClick={ this._selectScenario.bind(this, scenario.id) }>
          { scenario.name }
          <button onClick={ this._duplicateScenario.bind(this, scenario.id) }>Duplicate</button>
          <button onClick={ this._removeScenario.bind(this, scenario.id) }>Remove</button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Scenarios</h2>
        <button onClick={ this._addScenario.bind(this) }>+</button>

        <ul>{ this._scenarios() }</ul>
      </div>
    );
  }

}
