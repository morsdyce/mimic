import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleMock, renameScenario } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';

import { EditableLabel } from 'ui/components/editable-label';

import { Divider, List, ListItem, Toggle, Card, FlatButton, IconButton, RaisedButton } from 'material-ui';
import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

class Scenario extends Component {

  updateScenarioName(name) {
    this.props.renameScenario(this.props.id, name);
  }

  render() {
    const scenario = this.props.scenario;

    return (
      <div>

        <div className="row middle-xs">

          <div className="col-xs">
            <h1>
              <EditableLabel text={ scenario.name } onChange={ this.updateScenarioName.bind(this) } />
            </h1>
          </div>

          <div className="col-xs-1">
            <RaisedButton label="Back" primary={ true } onClick={ this.props.navigate.bind(this, 'scenarios') } />
          </div>

          <Divider />
        </div>




        <div className="row">
          <div className="col-xs">
            <List>
              { this.renderMocks() }
            </List>
          </div>
        </div>

      </div>
    )
  }

  renderMocks() {
    return this.props.scenario.mockedRequests.map((mockedRequest, index, mocks) => {

      return (
        <div key={ mockedRequest.id } className="row">
          <div className="col-xs">
            <ListItem
              primaryText={ `${mockedRequest.method} ${mockedRequest.url}`}
              secondaryTextLines={2}
              secondaryText={ mockedRequest.params }>
            </ListItem>
          </div>

          <div className="col-xs-3 end-xs middle-xs">
            <IconButton onClick={ this.props.navigate.bind(this, 'request-details', mockedRequest) }
                        tooltip="Edit" style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
              <EditIcon />
            </IconButton>

            <IconButton tooltip="Remove"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
              <DeleteIcon />
            </IconButton>
          </div>

          <div className="col-xs-1 end-xs">
            <Toggle style={{ margin: '12px 0 0 0'}}
                    toggled={ mockedRequest.active }
                    onToggle={ this.props.toggleMock.bind(this, this.props.id, mockedRequest.id) }/>
          </div>


        </div>
      );

    });
  }

}

const mapStateToProps = ({ scenarios }, ownProps) => ({
  scenario: scenarios.filter((scenario) => scenario.id === ownProps.id)[0]
});

export default connect(mapStateToProps, { toggleMock, renameScenario, navigate })(Scenario);