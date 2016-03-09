import 'ui/assets/stylesheets/components/scenario-request.scss';
import React from 'react';

import { Toggle } from 'material-ui';

export const ScenarioRequest = () => (
  <div>

    <div className="row between-xs">
      <div className="col-xs">
        <span>GET http://google.com</span>
      </div>

      <div className="col-xs-2">
        <Toggle defaultToggled={true}/>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-10 scenario-request-params">
        <span></span>
      </div>
    </div>

  </div>
);
