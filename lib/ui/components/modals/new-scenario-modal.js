import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

export class NewScenarioModal extends Component {

  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  }

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
          <TextField
            floatingLabelText="Scenario Name"
            style={{ width: '100%' }}
            onChange={ this.handleScenarioChange.bind(this) }
            onKeyUp={ this.onKeyUp }/>
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
    console.log({ event });
    this.setState({ scenarioName: event.target.value });
  }

}
