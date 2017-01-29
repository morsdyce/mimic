import React, { Component } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import Toggle from 'material-ui/lib/toggle';
import IconButton from 'material-ui/lib/icon-button';

import ContentCopyIcon from 'material-ui/lib/svg-icons/content/content-copy';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import PowerIcon from 'material-ui/lib/svg-icons/action/power-settings-new';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';

import { Request } from 'ui/components/request';
import { ScenarioRequest } from 'ui/components/scenario-request';
import { ConfirmRemoveScenario } from 'ui/components/modals/confirm-remove-scenario';

export class ScenarioOverview extends Component {

  constructor(props) {
    super(props);
    this.state = { isConfirmRemoveModalOpen : false };
    this.openConfirmRemoveModal = this.openConfirmRemoveModal.bind(this);
  }



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
              <Toggle disabled={ !this.props.active }
                      toggled={ this.props.active ? mockedRequest.active : false }
                      onToggle={ this.props.toggleMock.bind(this, this.props.id, mockedRequest.id) } />
            </div>
          </div>
          <div className="row" style={{ cursor: 'pointer' }}>
            <div className="col-xs" onClick={ () => this.props.editMock({ ...mockedRequest, mock: mockedRequest }) }>
              {mockedRequest.name || mockedRequest.url}
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
    const toggleTooltip = active ? 'Disable' : 'Enable';

    return (
      <div>

        <CardActions style={{ padding: 0}}>
          <div className="row top-xs center-xs">
            <div className="col-xs">

              <IconButton tooltip={ toggleTooltip } touch={false}
                          tooltipPosition="top-center"
                          style={{ width: '32px', height: '32px' }}
                          iconStyle={{ fontSize: 40, width: '16px', height: '16px', fill: active ? '' : 'gray' }}
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

              <IconButton disabled={ id === 'default-scenario' }
                          tooltip="Remove" touch={false}
                          tooltipPosition="top-center"
                          style={{ width: '32px', height: '32px' }}
                          iconStyle={{ fontSize: 40, width: '16px', height: '16px'}}
                          onClick={ this.openConfirmRemoveModal }>
                <DeleteIcon/>
              </IconButton>

            </div>
          </div>
        </CardActions>

        <ConfirmRemoveScenario
          open={ this.state.isConfirmRemoveModalOpen }
          onClose={ this.closeConfirmRemoveModal.bind( this ) }
          onSubmit={ this.handleConfirmRemoveSubmit.bind( this ) }/>
      </div>
    );
  }

  openConfirmRemoveModal() {
    this.setState({ isConfirmRemoveModalOpen : true });
  }

  closeConfirmRemoveModal() {
    this.setState({ isConfirmRemoveModalOpen : false });
  }

  handleConfirmRemoveSubmit() {
    this.props.remove();
    this.closeConfirmRemoveModal();
  }
}
