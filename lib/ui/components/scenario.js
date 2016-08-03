import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from 'api';

import { toggleMock, renameScenario, removeMock } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';

import { EditableLabel } from 'ui/components/editable-label';
import InlineExport from 'ui/components/inline-export';

import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';


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
              <InlineExport
                style={{ margin: '0 10px' }}
                filename={ scenario.name }
                exportData={ () => API.exportScenario(scenario.id) }
                tooltip={ `Export ${scenario.name}`} />
              <EditableLabel text={ scenario.name } onChange={ this.updateScenarioName.bind(this) } />
            </h1>
          </div>

          <div className="col-xs-2 center-xs">
            <RaisedButton label="Back" primary={ true } onClick={ () => this.props.navigate('scenarios') } />
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

  editMock(mock) {
    const request = this.props.capturedRequests.filter( request => request.mock === mock )[0];

    if (request) {
      this.props.navigate('request-details', request);
    } else {
      this.props.navigate('request-details', { ...mock, mock });
    }
  }

  renderMocks() {
    return this.props.scenario.mockedRequests.map((mockedRequest, index, mocks) => {

      return (
        <div key={ mockedRequest.id } className="row">
          <div className="col-xs">
            <ListItem
              onClick={ this.editMock.bind(this, mockedRequest) }
              primaryText={ `${mockedRequest.method} ${mockedRequest.url}`}
              secondaryTextLines={2}
              secondaryText={ mockedRequest.params }>
            </ListItem>
          </div>

          <div className="col-xs-3 end-xs middle-xs">
            <IconButton onClick={ this.editMock.bind(this, mockedRequest) }
                        tooltip="Edit" style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={ this.props.removeMock.bind(this, this.props.id, mockedRequest.id)}
                        tooltip="Remove"
                        style={{ width: '32px', height: '32px' }}
                        iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
              <DeleteIcon />
            </IconButton>

            <InlineExport
              filename={ mockedRequest.url }
              exportData={ () => API.exportMock(this.props.id, mockedRequest.id) }
              tooltip="Export Mock" />
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

const mapStateToProps = ({ scenarios, capturedRequests }, ownProps) => ({
  scenario: scenarios.filter((scenario) => scenario.id === ownProps.id)[0],
  capturedRequests
});

export default connect(mapStateToProps, { toggleMock, renameScenario, navigate, removeMock })(Scenario);
