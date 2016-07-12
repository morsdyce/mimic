import React from 'react';

import Select from 'react-select';
import { Paper, Toolbar, ToolbarGroup, TextField } from 'material-ui';
import  HttpStatus from 'http-status-codes';
import map from 'lodash/map';
import omit from 'lodash/omit';

const httpStatusCodes = map(omit(HttpStatus, 'getStatusText'), (value, key) => ({ value, label: key.replace(/_/g, ' ') }));

export const RequestInfo = ({ url, method, status, delay, onUrlChange, onStatusChange, onDelayChange }) => {

  const HttpOption = ({ value, label }) => <div key={ value }>{ value } { label }</div>;
  const HttpValue = ({ value, label }) => <div>{value} {label}</div>;

  return (
    <div>
      <div className="row">
        <div className="col-xs">
          <div className="row">
            <div className="col-xs">
              <Paper>
                <Toolbar style={ { backgroundColor: '#F5F5F5'} }>
                  <ToolbarGroup firstChild={true} float="left">
                    <Paper zDepth={2}
                           style={{ padding: '18px 30px', backgroundColor: '#FAFAFA', textAlign: 'center'}}>
                      <div>{ method }</div>
                    </Paper>
                  </ToolbarGroup>
                  <ToolbarGroup
                    style={ { padding: '15px 0 0 20px', width: '80%'} }>
                    <input onChange={ onUrlChange } type="text" value={ url }
                           style={{ outline: 'none', fontSize: '20px', border: 'none', width: '100%', background: 'transparent'}}/>
                  </ToolbarGroup>
                </Toolbar>
              </Paper>
            </div>
          </div>
        </div>
      </div>

      <div className="row request-details-status-code">
        <div className="col-xs-3">
          <p className="http-status-code-label">HTTP Status Code</p>
          <Select value={ status }
                  optionRenderer={ HttpOption }
                  valueRenderer={ HttpValue }
                  options={ httpStatusCodes }
                  clearable={ false }
                  onChange={ onStatusChange } />
        </div>

        <div className="col-xs-3">
          <TextField
            className="delay-text-field"
            hintText="200"
            value={ delay }
            floatingLabelText="Delay (ms)"
            onChange={ onDelayChange }/>
        </div>
      </div>

    </div>
  )
};
