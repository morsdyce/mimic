import React from 'react';
import { connect } from 'react-redux';

import { createNewScenario } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';

import { AppBar, IconButton, IconMenu, MenuItem, FlatButton, Paper} from 'material-ui';

import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ArrowUpwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-upward';
import ArrowDownwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-downward';
import CloudDownloadIcon from 'material-ui/lib/svg-icons/file/cloud-download';
import CloudUploadIcon from 'material-ui/lib/svg-icons/file/cloud-upload';
import CreateNewFolderIcon from 'material-ui/lib/svg-icons/file/create-new-folder';

export const Header = ({ createNewScenario, navigate }) => (
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

          <div className="col-xs-4">
            <div className="row center-xs">
              <div className="col-xs-12" onClick={ createNewScenario }>
                <CreateNewFolderIcon style={{fill: '#fff'}}/>
              </div>
            </div>

            <div className="row center-xs">
              <div className="col-xs-12">
                New Scenario
              </div>
            </div>
          </div>

          <div className="col-xs-4">
            <div className="row center-xs">
              <div className="col-xs-12">
                <CloudUploadIcon style={{fill: '#fff'}}/>
              </div>
            </div>

            <div className="row center-xs">
              <div className="col-xs-12">
                Import
              </div>
            </div>
          </div>

          <div className="col-xs-4">
            <div className="row center-xs">
              <div className="col-xs-12">
                <CloudDownloadIcon style={{fill: '#fff'}}/>
              </div>
            </div>

            <div className="row center-xs">
              <div className="col-xs-12">
                Export
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </Paper>
);

export default connect(null, { createNewScenario, navigate })(Header);