import React from 'react';
import UIToggle from 'ui/components/new/UIToggle';
import LatestRequestNotifications from 'ui/components/new/LatestRequestNotifications';
import QuickEdit from 'ui/components/new/QuickEdit';

class Mimic extends React.Component {
  constructor() {
    super();

    this.state = {
      quickEditVisible: false
    };

    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onEdit(request) {
    this.setState({ quickEditVisible: true });
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
          <LatestRequestNotifications API={ this.props.API } onEdit={ this.onEdit }/>
        }

        {
          this.state.quickEditVisible &&
          <QuickEdit onSave={ this.onSave }/>
        }
      </div>
    );
  }
}

export default Mimic;
