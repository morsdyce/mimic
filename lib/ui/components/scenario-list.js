import React from 'react';

export class ScenarioList extends React.Component {

  static get propTypes() {
    return {
      scenarios: React.PropTypes.array.isRequired,
      addScenario: React.PropTypes.func.isRequired,
      removeScenario: React.PropTypes.func.isRequired,
      duplicateScenario: React.PropTypes.func.isRequired
    };
  }

  _addScenario() {
    const name = prompt('Please enter scenario name');

    this.props.addScenario(name);
  }

  _removeScenario(scenarioId) {
    this.props.removeScenario(scenarioId);
  }

  _duplicateScenario(scenarioId) {
    this.props.duplicateScenario(scenarioId);
  }

  _scenarios() {
    return this.props.scenarios.map((scenario) => {
      return (
        <li key={ scenario.id }>
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
