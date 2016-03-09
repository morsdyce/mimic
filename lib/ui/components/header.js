import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ArrowUpwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-upward';
import ArrowDownwardIcon from 'material-ui/lib/svg-icons/navigation/arrow-downward';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';

import CloudDownloadIcon from 'material-ui/lib/svg-icons/file/cloud-download';
import CloudUploadIcon from 'material-ui/lib/svg-icons/file/cloud-upload';
import CreateNewFolderIcon from 'material-ui/lib/svg-icons/file/create-new-folder';

import Paper from 'material-ui/lib/paper';

export const Header = () => (
  <Paper zDepth={1}>
    <div className="row middle-xs"
         style={{ padding: '0 16px', background: '#00BCD4', color: '#fff'}}>
      <div className="col-xs-1">
        <h1>BDSM</h1>
      </div>

      <div className="col-xs center-xs"
           style={{ fontSize: '21px', textAlign: 'center'}}>
        Login Success
      </div>

      <div className="col-xs-2 end-xs">
        <div className="row middle-xs">

          <div className="col-xs-4">
            <div className="row center-xs">
              <div className="col-xs-12">
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


//{ /*
// <AppBar
// title="BDSM"
// showMenuIconButton={false}>
// <div className="row middle-xs center-xs">
// <div className="col-xs-8 center-xs" style={{ textAlign: 'center', fontSize: '21px',  color: '#fff' }}>
// Login Success
// </div>
// </div>
//
//
//
//
// </AppBar>
//
// */ }
