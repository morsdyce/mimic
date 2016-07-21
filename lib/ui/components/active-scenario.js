import React from 'react';

import List  from 'material-ui/lib/lists/list';
import ListItem  from 'material-ui/lib/lists/list-item';
import Divider  from 'material-ui/lib/divider';
import Toggle  from 'material-ui/lib/toggle';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/image/edit';

import { Request } from 'ui/components/request';
import { ScenarioRequest } from 'ui/components/scenario-request';

import { blueGrey800 } from 'material-ui/lib/styles/colors';

export const ActiveScenario = () => (
  <div className="row">
    <div className="col-xs">
      <div className="row">
        <div className="col-xs">
          <h2>Login Success</h2>
        </div>
        <div className="col-xs-1">
          <span className="end-xs">
            <IconButton tooltip="Edit" style={{ padding: '12px 18px 0 12px'}}
                        iconStyle={{ width: '18px', height: '18px'}}>
              <EditIcon />
            </IconButton>
          </span>
        </div>
      </div>
      <Divider />
      <div className="active-scenario-requests">
        <List>
          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>

          <Divider />
          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="">

          </ListItem>
          <Divider />

          <ListItem primaryText="GET http://www.google.com"
                    secondaryTextLines={2}
                    rightToggle={ <Toggle defaultToggled={true}/> }
                    secondaryText="q=what+is+the+meaning+of+life&oq=what+is+the+meaning+of+life&aqs=chrome.0.0l6.2503j0j7&sourceid=chrome&es_sm=91&ie=UTF-8">

          </ListItem>


        </List>
      </div>
    </div>
  </div>
);
