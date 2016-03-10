import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Tab, Tabs, List, ListItem, Divider } from 'material-ui';

import { fetch } from 'ui/actions/api';
import { Request } from 'ui/components/request';

export class Requests extends Component {

  render() {
    return (
      <Paper zDepth={2} rounded={false}>
        <List style={{overflowY: 'scroll', height: '87vh'}}>
          { this._renderRequests() }
        </List>
      </Paper>
    );
  }

  componentDidMount() {
    this.props.fetch();
  }

  _renderRequests() {
    return this.props.capturedRequests.map((request) => (
      <div key={ request.id }>
        <ListItem className="request-row" rightIconButton={<div></div>}>
          <Request url={ request.url } method={ request.method } params={ request.params } mocked={false} />
        </ListItem>
        <Divider />
      </div>
    ));
  }

}

const mapStateToProps = (store) => ({ capturedRequests: store.capturedRequests });

export default connect(mapStateToProps, { fetch })(Requests);