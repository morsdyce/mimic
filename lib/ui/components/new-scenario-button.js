import React, {Component} from 'react';
import {NewScenarioModal} from 'ui/components/modals/new-scenario-modal';
import CreateNewFolderIcon from 'material-ui/lib/svg-icons/file/create-new-folder';

export class NewScenarioButton extends Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  onClose() {
    this.setState({ open: false });
  }

  handleClick() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div className="col-xs-3 cursor-pointer">
        <div className="row center-xs">
          <div className="col-xs-12" onClick={ this.handleClick.bind(this) }>
            <CreateNewFolderIcon style={{fill: '#fff'}}/>
          </div>
        </div>

        <div className="row center-xs">
          <div className="col-xs-12">
            New Scenario
            <NewScenarioModal open={ this.state.open }
                              onClose={ this.onClose.bind(this) }
                              onConfirm={ this.props.onConfirm }/>
          </div>
        </div>
      </div>
    );
  }

}