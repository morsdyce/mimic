import 'ui/assets/stylesheets/components/scenario.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _includes from 'lodash/includes';
import TextField from 'material-ui/lib/text-field';

import { ScenarioSearch } from 'ui/components/scenario-search';
import { ScenarioOverview } from 'ui/components/scenario-overview';
import { ActiveScenario } from 'ui/components/active-scenario';
import { fetchScenarios, toggleScenario, duplicateScenario, removeScenario, toggleMock } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';


class Scenarios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  render() {
    return (
      <div>
        <div className="row scenarios">

          <div className="col-xs">
            { this._renderSearch() }

            <div className="scenario-list">
              <div className="row scenarios">
                { this._renderScenarios() }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchScenarios();
  }

  _renderSearch() {
    return (
      <div className="row">
        <div className="col-xs">
          <div className="scenario-search">
            <TextField
              fullWidth={ true }
              floatingLabelText="Search"
              onChange={ this.setSearchText.bind(this) }
            />
          </div>
        </div>
      </div>
    );
  }

  setSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  getScenarios() {
    if (!this.state.searchText) {
      return this.props.scenarios;
    }

    return this.props.scenarios.filter((scenario) =>
      _includes(scenario.name.toLowerCase(), this.state.searchText.toLowerCase()));
  }

  _renderScenarios() {
    return this.getScenarios().map((scenario) => (
      <div className="col-xs-4 scenario-box" key={ scenario.id }>
        <div className="box">
          <ScenarioOverview id={ scenario.id }
                            name={ scenario.name }
                            active={ scenario.active }
                            mockedRequests={ scenario.mockedRequests }
                            toggle={ this.props.toggleScenario.bind(this, scenario.id) }
                            duplicate={ this.props.duplicateScenario.bind(this, scenario.id) }
                            remove={ this.props.removeScenario.bind(this, scenario.id) }
                            edit={ this.props.navigate.bind(this, 'scenario', { id: scenario.id }) }
                            editMock={ this.props.navigate.bind(this, 'request-details') }
                            toggleMock={ this.props.toggleMock } />
        </div>
      </div>
    ));
  }

}

const mapStateToProps = (state) => ({ scenarios: state.scenarios });

export default connect(mapStateToProps, {
  fetchScenarios,
  toggleScenario,
  duplicateScenario,
  removeScenario,
  toggleMock,
  navigate
})(Scenarios);
