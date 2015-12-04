import { API } from 'api/index';
import React from 'react';

import { ScenarioName } from 'ui/components/scenario-name';

export class ScenarioList extends React.Component {

  static get propTypes() {
    return {
      isScenarioSelected: React.PropTypes.bool,
      onSelect: React.PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { selectedScenarioId: null }
  }

  _addScenario() {
    const name = prompt('Please enter scenario name');

    API.addScenario(name);
  }

  _selectScenario(scenario) {
    this.props.onSelect(scenario);
    this.setState({ selectedScenarioId: scenario.id })
  }

  _isSelected(scenarioId) {
    return this.props.isScenarioSelected && this.state.selectedScenarioId
     ? this.state.selectedScenarioId === scenarioId
     : false;
  }

  _scenarios() {
    return API.scenarios.map((scenario) => {
      return (
        <ScenarioName key={ scenario.id }
                      scenario={ scenario }
                      selected={ this._isSelected(scenario.id) }
                      onSelectScenario={ this._selectScenario.bind(this) }/>
      );
    });
  }

  render() {
    return (
      <div className="scenario-list">
        <div className="header">
          <h4>Scenarios</h4>

          <i className="fa fa-plus add-scenario"
             onClick={ this._addScenario.bind(this) }>
          </i>
        </div>

        <ul>{ this._scenarios() }</ul>
      </div>
    );
  }

}
