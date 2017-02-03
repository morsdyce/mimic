import React from 'react';
import UIToggle from 'ui/components/new/UIToggle';
import LatestRequestNotifications from 'ui/components/new/LatestRequestNotifications';
import QuickEdit from 'ui/components/new/QuickEdit';

class Mimic extends React.Component {
  constructor() {
    super();

    this.state = {
      quickEditVisible: false,
      selectedRequestId: null
    };

    this.onEdit        = this.onEdit.bind(this);
    this.onSave        = this.onSave.bind(this);
    this.selectRequest = this.selectRequest.bind(this);
  }

  onEdit(requestId) {
    this.setState({
      quickEditVisible: true,
      selectedRequestId: requestId
    });
  }

  selectRequest(requestId) {
    this.setState({ selectedRequestId: requestId });
  }

  onSave(request) {
    this.setState({ quickEditVisible: false });
  }

  render() {
    return (
      <div>
        {
          !this.state.quickEditVisible &&
          <UIToggle onToggle={ this.props.onToggle }/>
        }

        {
          !this.state.quickEditVisible &&
          <LatestRequestNotifications API={ this.props.API }
                                      onEdit={ this.onEdit }/>
        }

        {
          this.state.quickEditVisible &&
          <QuickEdit API={ this.props.API }
                     selectedRequestId={ this.state.selectedRequestId }
                     onSelectRequest={ this.selectRequest }
                     onSave={ this.onSave }/>
        }
      </div>
    );
  }
}

export default Mimic;
