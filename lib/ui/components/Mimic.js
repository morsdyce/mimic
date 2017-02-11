import React from 'react';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import QuickEdit from 'ui/components/QuickEdit';
import FullEdit from 'ui/components/FullEdit';
import RequestLog from 'ui/components/RequestLog';
import MimicControls from 'ui/components/MimicControls';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999999999999;
  background-color: white;
  font-size: 14px;
  font-family: Arial, sans-serif;
`;


class Mimic extends React.Component {
  constructor() {
    super();

    this.state = {
      uiState: 'closed',
      selectedRequestId: null,
      showRequestLogOnQuickEdit: false,
      latestRequest: null
    };

    this.onEdit           = this.onEdit.bind(this);
    this.onSave           = this.onSave.bind(this);
    this.selectRequest    = this.selectRequest.bind(this);
    this.setLatestRequest = this.setLatestRequest.bind(this);
    this.switchToFullEdit = this.switchToFullEdit.bind(this);
    this.switchToLog      = this.switchToLog.bind(this);
    this.closeFullEditor  = this.closeFullEditor.bind(this);
  }

  onEdit(requestId, options = {}) {
    this.setState({
      uiState: 'quickEdit',
      selectedRequestId: requestId,
      showRequestLogOnQuickEdit: Boolean(options.openRequestLog)
    });
  }

  selectRequest(requestId) {
    this.setState({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
  }

  onSave() {
    this.setState({ uiState: 'closed' });
    this.setLatestRequest({ requestId: this.state.selectedRequestId });
  }

  switchToFullEdit() {
    this.setState({ uiState: 'mocks' });
  }

  switchToLog() {
    this.setState({ uiState: 'requests' })
  }

  closeFullEditor() {
    this.setState({ uiState: 'closed' });
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
      <Container>
        <MimicControls
          showLogs={ this.switchToLog }
          showMocks={ this.switchToFullEdit }/>

        {
          this.state.uiState === 'closed' &&
          <LatestRequestNotifications
            API={ this.props.API }
            onEdit={ this.onEdit }/>
        }

        {
          this.state.uiState === 'quickEdit' &&
          <QuickEdit API={ this.props.API }
                     selectedRequestId={ this.state.selectedRequestId }
                     latestRequest={ this.state.latestRequest }
                     onSelectRequest={ this.selectRequest }
                     autoShowRequestLog={ this.state.showRequestLogOnQuickEdit }
                     switchToFullEdit={ this.switchToFullEdit }
                     onSave={ this.onSave }/>
        }

        {
          this.state.uiState === 'mocks' &&
          <FullEdit API={ this.props.API }
                    closeFullEditor={ this.closeFullEditor }/>
        }

        {
          this.state.uiState === 'requests' &&
          <RequestLog API={ this.props.API }/>
        }
      </Container>
    );
  }
}

export default Mimic;
