import React, { Component } from 'react';

import { Card, CardActions, CardHeader, FlatButton, CardText, ListItem, List, Divider,
  Toggle, IconButton } from 'material-ui';

import ContentCopyIcon from 'material-ui/lib/svg-icons/content/content-copy';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import CheckCircleIcon from 'material-ui/lib/svg-icons/action/check-circle';
import PowerIcon from 'material-ui/lib/svg-icons/action/power-settings-new';

import { Request } from 'ui/components/request';
import { ScenarioRequest } from 'ui/components/scenario-request';

export class Scenario extends Component {

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
    return this.props.mockedRequests.map((mockedRequest, index, requests) => {
      const lastItem = (requests.length - 1) === index;

      return (
        <div key={ mockedRequest.id }>
          <ListItem primaryText={ `${mockedRequest.method} ${mockedRequest.url}`}
                    secondaryTextLines={2}
                    secondaryText={ mockedRequest.params }
                    rightToggle={<Toggle toggled={ mockedRequest.active } onToggle={ this.props.toggleMock.bind(this, this.props.id, mockedRequest.id) } />} >

          </ListItem>
          { lastItem ? null : <Divider /> }
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
