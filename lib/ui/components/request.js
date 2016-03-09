import React from 'react';

import 'ui/assets/stylesheets/components/request.scss';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

function mockedState(mocked) {
  return (
    <span style={{ position: 'relative'}}>
      { mocked ? (
          <div style={{ background: '#03A9F4', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', position: 'relative', top: '10px', right: '0'}}>
            <span style={{ position: 'absolute', top: '7px', left: '7px'}}>M</span>
          </div>
      ) : null }

    </span>
  );
}

export const Request = ({ url, method, params, mocked}) => (
  <div>
    <div className="row">

      <div className="col-xs">
        <div className="row end-xs request-actions">
          <div className="col-xs-2">
            { mockedState(mocked) }
          </div>

        </div>

        <div className="request-method">{ method}</div>
        <div className="request-url">{ url }</div>
        <div className="request-params">{ params }</div>
      </div>

    </div>

  </div>
);
