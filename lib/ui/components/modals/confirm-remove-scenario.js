import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

export class ConfirmRemoveScenario extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={ this.props.onClose }
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={ this.props.onSubmit }
      />
    ];

    const message = "Are you sure? This action cannot be undone.";

    return (
      <div>

        <Dialog
          style={{ zIndex: 2147483646 }}
          title="Remove Scenario"
          actions={ actions }
          modal={ false }
          open={ this.props.open }
          onRequestClose={ this.props.onClose }>
          { message }
        </Dialog>

      </div>
    );
  }
}
