import React from 'react';

import 'ui/assets/stylesheets/components/scenario.scss';

import { ScenarioSearch } from 'ui/components/scenario-search';
import { Scenario } from 'ui/components/scenario';
import { ActiveScenario } from 'ui/components/active-scenario';

import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

export const Scenarios = () => (
  <div>
    <div className="row scenarios">

      <div className="col-xs">
        <div className="row">
          <div className="col-xs">
            <ScenarioSearch />
          </div>
        </div>

        <div className="scenario-list">
          <div className="row scenarios">
            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario active={true}/>
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario active={true} />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario active={true} />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>

            <div className="col-xs-4 scenario-box">
              <div className="box">
                <Scenario />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
