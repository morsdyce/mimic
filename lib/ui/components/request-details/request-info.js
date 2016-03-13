import React from 'react';

import { Paper, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton, TextField } from 'material-ui';

export const RequestInfo = ({ url, method, params, status, delay, onUrlChange }) => (
  <div>

    <div className="row">
      <div className="col-xs">
        <div className="row">
          <div className="col-xs">
            <Paper>
              <Toolbar style={ { backgroundColor: '#F5F5F5'}}>
                <ToolbarGroup firstChild={true} float="left">
                  <Paper zDepth={2}
                         style={{ padding: '18px 30px', backgroundColor: '#FAFAFA', textAlign: 'center'}}>
                    <div>{ method }</div>
                  </Paper>
                </ToolbarGroup>
                <ToolbarGroup style={ { padding: '15px 0 0 20px', width: '80%'}}>
                  <input onChange={ onUrlChange } type="text" defaultValue={ url } style={{ outline: 'none', fontSize: '20px', border: 'none', width: '100%', background: 'transparent'}} />
                </ToolbarGroup>
                <ToolbarGroup float="right">
                  <ToolbarSeparator />
                  <RaisedButton label="Params" primary={true}/>
                </ToolbarGroup>

              </Toolbar>
            </Paper>
          </div>
        </div>
      </div>
    </div>

    <div className="row request-details-status-code">
      <div className="col-xs-3">
        <TextField
          hintText="200"
          floatingLabelText="Status Code"
          defaultValue={ status }/>
      </div>

      <div className="col-xs-3">
        <TextField
          hintText="200"
          defaultValue={ delay }
          floatingLabelText="Delay"/>
      </div>
    </div>

  </div>
);
