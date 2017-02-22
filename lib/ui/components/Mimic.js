import React from 'react';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import QuickEdit from 'ui/components/QuickEdit';
import FullEdit from 'ui/components/FullEdit';
import RequestLog from 'ui/components/RequestLog';
import styled from 'styled-components';
import API from 'api';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

  state = {
    uiState: 'closed',
    selectedRequestId: null,
    latestRequest: null,
    editorSize: null,
  };

  onEdit = (requestId) => {
    this.setState({
      uiState: 'quickEdit',
      selectedRequestId: requestId,
    });
  };

  selectRequest = (requestId) => {
    this.setState({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
  };

  onSave = () => {
    this.setState({ uiState: 'closed' });
    this.setLatestRequest({ requestId: this.state.selectedRequestId });
  };

  switchToFullEdit = () => {
    this.setState({ uiState: 'mocks' });
  };

  switchToLog = () => {
    this.setState({ uiState: 'requests' })
  };

  closeFullEditor = () => {
    this.setState({ uiState: 'closed' });
  };

  setEditorSize = (editorSize) => {
    this.setState({ editorSize });
  };

  setLatestRequest = ({ requestId }) => {
    this.setState({ latestRequest: API.getCapturedRequest(requestId) });
  };

  componentDidMount() {
    API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  render() {
    return (
      <Container>
        {
          this.state.uiState === 'closed' &&
          <LatestRequestNotifications
            onEdit={ this.onEdit }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }/>
        }

        {
          this.state.uiState === 'quickEdit' &&
          <QuickEdit
            selectedRequestId={ this.state.selectedRequestId }
            latestRequest={ this.state.latestRequest }
            onSelectRequest={ this.selectRequest }
            switchToFullEdit={ this.switchToFullEdit }
            onSave={ this.onSave }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }/>
        }

        {
          this.state.uiState === 'mocks' &&
          <FullEdit
            closeFullEditor={ this.closeFullEditor }
            setEditorSize={ this.setEditorSize }
            editorSize={ this.state.editorSize }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }
            activeTab={ this.state.uiState }/>
        }

        {
          this.state.uiState === 'requests' &&
          <RequestLog
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }
            closeFullEditor={ this.closeFullEditor }
            setEditorSize={ this.setEditorSize }
            editorSize={ this.state.editorSize }
            activeTab={ this.state.uiState }/>
        }
      </Container>
    );
  }
}

export default DragDropContext(HTML5Backend)(Mimic);
