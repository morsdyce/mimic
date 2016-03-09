import 'ui/assets/stylesheets/components/sidebar.scss';
import React from 'react';

import { Paper } from 'material-ui';

import { Header } from 'ui/components/header';
import { Requests } from 'ui/components/requests';
import { Search } from 'ui/components/search';
import { MainPanel } from 'ui/components/main-panel';

export const Layout = () => (
  <div style={{overflow: 'hidden'}}>
    <div className="row">
      <div className="col-xs-12">
        <Header />
      </div>
    </div>

    <div className="row sidebar">
      <div className="col-xs-3">

        <div className="row">
          <div className="col-xs-12">
            <Search />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Requests />
          </div>
        </div>
      </div>

      <div className="col-xs-9 main">
        <MainPanel />
      </div>

    </div>
  </div>
);
