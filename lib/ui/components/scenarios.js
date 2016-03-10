import 'ui/assets/stylesheets/components/scenario.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import { ScenarioSearch } from 'ui/components/scenario-search';
import { Scenario } from 'ui/components/scenario';
import { ActiveScenario } from 'ui/components/active-scenario';

class Scenarios extends Component {

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

  _renderSearch() {
    return (

      <div className="row">
        <div className="col-xs">
          <ScenarioSearch />
        </div>
      </div>
    );
  }

  _renderScenarios() {
    return this.props.scenarios.map((scenario) => (
      <div className="col-xs-4 scenario-box" key={ scenario.id }>
        <div className="box">
          <Scenario name={ scenario.name } active={ scenario.active }/>
        </div>
      </div>
    ));
  }

}

const mapStateToProps = (state) => ({ scenarios: state.scenarios });

export default connect(mapStateToProps, null)(Scenarios);
