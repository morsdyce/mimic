import React from 'react';
import EVENTS from 'api/constants/events';
import UIToggle from 'ui/components/UIToggle';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import QuickEdit from 'ui/components/QuickEdit';
import FullEdit from 'ui/components/FullEdit';

class Mimic extends React.Component {
  constructor() {
    super();

    this.state = {
      quickEditVisible: false,
      fullEditVisible: false,
      selectedRequestId: null,
      showRequestLogOnQuickEdit: false,
      latestRequest: null
    };

    this.onEdit           = this.onEdit.bind(this);
    this.onSave           = this.onSave.bind(this);
    this.selectRequest    = this.selectRequest.bind(this);
    this.setLatestRequest = this.setLatestRequest.bind(this);
    this.switchToFullEdit = this.switchToFullEdit.bind(this);
    this.closeFullEditor  = this.closeFullEditor.bind(this);
  }

  onEdit(requestId, options = {}) {
    this.setState({
      quickEditVisible: true,
      selectedRequestId: requestId,
      showRequestLogOnQuickEdit: Boolean(options.openRequestLog)
    });
  }

  selectRequest(requestId) {
    this.setState({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
  }

  onSave() {
    this.setState({ quickEditVisible: false });
    this.setLatestRequest({ requestId: this.state.selectedRequestId });
  }

  switchToFullEdit() {
    this.setState({
      quickEditVisible: false,
      fullEditVisible: true
    });
  }

  closeFullEditor() {
    this.setState({
      fullEditVisible: false
    });
  }

  componentDidMount() {
    this.props.API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  setLatestRequest({ requestId }) {
    this.setState({ latestRequest: this.props.API.getCapturedRequest(requestId) });
  }

  componentDidUpdate() {
    if (this.state.showRequestLogOnQuickEdit) {
      this.setState({ showRequestLogOnQuickEdit: false });
    }
  }

  render() {
    return (
      <div>
        {
          !this.state.quickEditVisible &&
          <UIToggle/>
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
                     latestRequest={ this.state.latestRequest }
                     onSelectRequest={ this.selectRequest }
                     autoShowRequestLog={ this.state.showRequestLogOnQuickEdit }
                     switchToFullEdit={ this.switchToFullEdit }
                     onSave={ this.onSave }/>
        }

        {
          this.state.fullEditVisible &&
          <FullEdit API={ this.props.API }
                    closeFullEditor={ this.closeFullEditor }/>
        }
      </div>
    );
  }
}

export default Mimic;
