import 'ui/assets/stylesheets/components/sidebar.scss';
import React from 'react';

import normalizeCss from 'normalize.css/normalize.css';
import flexboxGrid from 'flexboxgrid';
import reactSelect from 'react-select/dist/react-select.css';
import applicationCss from 'ui/assets/stylesheets/application.scss';

let styles = {
  __html: `
  <style>
    ${ normalizeCss.toString() }
    ${ flexboxGrid.toString() }
    ${ reactSelect.toString() }
    ${ applicationCss.toString() }
  </style>
`
};

import Header from 'ui/components/header';
import Requests from 'ui/components/requests';
import MainPanel from 'ui/components/main-panel';

export const Layout = () => (
  <div style={{overflow: 'hidden', height: '100%'}}>
    <div dangerouslySetInnerHTML={ styles }></div>
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
