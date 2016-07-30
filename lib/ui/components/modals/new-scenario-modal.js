import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class NewScenarioModal extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={ this.props.onClose }
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={ this.handleSubmit.bind(this) }
      />
    ];

    return (
      <div>
        <Dialog
          style={{ zIndex: 2147483646 }}
          title="New Scenario"
          actions={ actions }
          modal={ false }
          open={ this.props.open }
          onRequestClose={ this.props.onClose }>
          <TextField floatingLabelText="Scenario Name" style={{ width: '100%' }} onChange={ this.handleScenarioChange.bind(this) } />
        </Dialog>
      </div>
    );
  }

  handleSubmit() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state.scenarioName);
    }

    this.props.onClose();
  }

  handleScenarioChange(event) {
    this.setState({ scenarioName: event.target.value });
  }

}
