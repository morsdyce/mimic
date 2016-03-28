import 'ui/assets/stylesheets/components/sidebar.scss';
import React from 'react';

import { Paper } from 'material-ui';

import Header from 'ui/components/header';
import Requests from 'ui/components/requests';
import MainPanel from 'ui/components/main-panel';

export const Layout = () => (
  <div style={{overflow: 'hidden', height: '100%'}}>
    <div className="row">
      <div className="col-xs-12">
        <Header />
      </div>
    </div>

    <div className="row sidebar">
      <div className="col-xs-3">
        <Requests />
      </div>

      <div className="col-xs-9 main">
        <MainPanel />
      </div>

    </div>
  </div>
);
