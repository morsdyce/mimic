import React, { Component } from 'react';

import { Card, CardActions, CardHeader, FlatButton, CardText, ListItem, List, Divider,
  Toggle, IconButton } from 'material-ui';

import ContentCopyIcon from 'material-ui/lib/svg-icons/content/content-copy';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import CheckCircleIcon from 'material-ui/lib/svg-icons/action/check-circle';
import PowerIcon from 'material-ui/lib/svg-icons/action/power-settings-new';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

import { Request } from 'ui/components/request';
import { ScenarioRequest } from 'ui/components/scenario-request';

export class ScenarioOverview extends Component {

  render() {

    const { name, active } = this.props;

    return (
      <div>
        <Card initiallyExpanded={false}
              style={{ borderBottom: active ? '4px solid #2196F3' : null }}>

          <CardHeader
            title={ name }
            actAsExpander={true}
            showExpandableButton={true}
            style={{ padding: '16px 16px 0 16px', height: '48px'}}>
          </CardHeader>

          <CardText expandable={true}>
            <List>
              { this._renderMockList() }
            </List>
          </CardText>

          { this._renderActions() }
        </Card>
      </div>
    );
  }

  _renderMockList() {

    if (!this.props.mockedRequests.length) {
      return (
        <div>
          <span>No Mocked requests</span>
          <Divider />
        </div>
      );
    }

    return this.props.mockedRequests.map((mockedRequest, index, requests) => {
      const lastItem = (requests.length - 1) === index;

      return (
        <div key={ mockedRequest.id } style={{ margin: '0 0 15px'}}>
          <div className="row top-xs">
            <div className="col-xs-2">
              {mockedRequest.method}
            </div>
            <div className="col-xs-2 col-xs-offset-8">
              <Toggle toggled={ mockedRequest.active } onToggle={ this.props.toggleMock.bind(this, this.props.id, mockedRequest.id) } />
            </div>
          </div>
          <div className="row" style={{ cursor: 'pointer' }}>
            <div className="col-xs" onClick={ () => this.props.editMock({ ...mockedRequest, mock: mockedRequest }) }>
              {mockedRequest.url}
            </div>
          </div>
          <div className="row" style={{ color: '#8D8E8E'}}>
            <div className="col-xs">
              {mockedRequest.params}
            </div>
          </div>

          { lastItem ? null : <Divider style={{ marginTop: '10px'}} /> }
        </div>
      );
    });
  }

  _renderActions() {

    const { active, id } = this.props;

    return (
      <CardActions style={{ padding: 0}}>
        <div className="row top-xs center-xs">
          <div className="col-xs">

            <IconButton tooltip="Enable" touch={false}
                        tooltipPosition="top-center"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '16px', height: '16px'}}
                        onClick={ this.props.toggle }>
              <PowerIcon />
            </IconButton>

            <IconButton tooltip="Edit" touch={false}
                        tooltipPosition="top-center"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '16px', height: '16px'}}
                        onClick={ this.props.edit }>
              <EditIcon />
            </IconButton>

            <IconButton tooltip="Duplicate" touch={false}
                        tooltipPosition="top-center"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '16px', height: '16px'}}
                        tooltipStyles={{marginLeft: 7}}
                        onClick={ this.props.duplicate }>
              <ContentCopyIcon />
            </IconButton>

            <IconButton tooltip="Remove" touch={false}
                        tooltipPosition="top-center"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '16px', height: '16px'}}
                        onClick={ this.props.remove }>
              <DeleteIcon />
            </IconButton>

          </div>
        </div>
      </CardActions>
    );
  }
}
