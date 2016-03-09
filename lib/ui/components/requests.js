import React from 'react';

import Paper from 'material-ui/lib/paper';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import { Request } from 'ui/components/request';

export const Requests = () => (
  <Paper zDepth={2} rounded={false}>
    <List style={{overflowY: 'scroll', height: '87vh'}}>
      <ListItem className="request-row" rightIconButton={<div></div>}>
        <Request url="http://www.google.com" method="GET" params="?q=my+search" mocked={true} />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" mocked={true} />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" mocked={true} />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
      <Divider />
      <ListItem className="request-row">
        <Request url="http://www.google.com" method="GET" params="?q=my+search" />
      </ListItem>
    </List>
  </Paper>
);
