import React from 'react';
import { connect } from 'react-redux';

import { Export } from 'ui/components/export';
import { Import } from 'ui/components/import';
import { NewScenarioButton } from 'ui/components/new-scenario-button';
import { createNewScenario, importScenarios } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';


import { Paper } from 'material-ui';

export const Header = ({ createNewScenario, navigate, importScenarios }) => (
  <Paper zDepth={1}>
    <div className="row middle-xs"
         style={{ padding: '0 16px', background: '#00BCD4', color: '#fff'}}>
      <div className="col-xs-1" onClick={ navigate.bind(this, 'scenarios') }>
        <h1>BDSM</h1>
      </div>

      <div className="col-xs center-xs"
           style={{ fontSize: '21px', textAlign: 'center'}}>
      </div>

      <div className="col-xs-2 end-xs">
        <div className="row middle-xs">
          <NewScenarioButton onConfirm={ createNewScenario }/>
          <Import import={ importScenarios } />
          <Export />
        </div>
      </div>
    </div>
  </Paper>
);


export default connect(null, {
  createNewScenario,
  navigate,
  importScenarios
})(Header);