import 'ui/assets/stylesheets/components/request-details.scss';
import React from 'react';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import { RaisedButton, IconMenu, IconButton, MenuItem, DropDownMenu, Toolbar, ToolbarGroup, ToolbarSeparator,
ToolbarTitle, Paper, TextField, Tabs, Tab, List, ListItem, Divider, AutoComplete } from 'material-ui';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

export const RequestDetails = () => (
  <div className="request-details">

    <div className="row end-xs action-buttons">
      <div className="col-xs-1">
        <RaisedButton label="Cancel" secondary={ true }/>
      </div>

      <div className="col-xs-1">
        <RaisedButton label="Save" primary={ true }/>
      </div>
    </div>

    <div className="row">
      <div className="col-xs">
        <div className="row">
          <div className="col-xs">
            <Paper>
              <Toolbar style={ { backgroundColor: '#F5F5F5'}}>
                <ToolbarGroup firstChild={true} float="left">
                  <Paper zDepth={2} style={{ padding: '18px 30px', backgroundColor: '#FAFAFA', textAlign: 'center'}}>
                    <div>GET</div>
                  </Paper>
                </ToolbarGroup>
                <ToolbarGroup style={ { padding: '0 0 0 20px'}}>
                  <ToolbarTitle text="http://www.google.com"/>
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
          defaultValue={200}/>
      </div>

      <div className="col-xs-3">
        <TextField
          hintText="200"
          defaultValue={0}
          floatingLabelText="Delay"/>
      </div>
    </div>



    <div className="row request-details-body">
      <div className="col-xs">
        <Tabs inkBarStyle={ { backgroundColor: '#52B665' }}
              tabItemContainerStyle={ { backgroundColor: '#fff', borderBottom: '1px solid #52B665' }}>
          <Tab label="Response Headers" value="a" style={{ color: '#000'}}>
            <div>
              <List>
                <ListItem>

                  <div className="row">
                    <div className="col-xs-3">
                      <AutoComplete
                        hintText="Header"
                        filter={AutoComplete.noFilter}
                        dataSource={[]}
                      />
                    </div>

                    <div className="col-xs-3">
                      <TextField
                        hintText="Value" />
                    </div>
                  </div>

                </ListItem>

                <ListItem>

                  <div className="row">
                    <div className="col-xs-3">
                      <AutoComplete
                        hintText="Header"
                        filter={AutoComplete.noFilter}
                        dataSource={[]}
                      />
                    </div>

                    <div className="col-xs-3">
                      <TextField
                        hintText="Value" />
                    </div>
                  </div>

                </ListItem>

                <ListItem>

                  <div className="row">
                    <div className="col-xs-3">
                      <AutoComplete
                        hintText="Header"
                        filter={AutoComplete.noFilter}
                        dataSource={[]}
                      />
                    </div>

                    <div className="col-xs-3">
                      <TextField
                        hintText="Value" />
                    </div>
                  </div>

                </ListItem>
              </List>
            </div>
          </Tab>
          <Tab label="Response Body" value="b" style={{ color: '#000'}}>
            <div>
              <AceEditor
                mode="json"
                theme="github"
                name="ACE_EDITOR"
                width="100%"
                />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>


  </div>
);
