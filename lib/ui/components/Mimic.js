import React from 'react';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import QuickEdit from 'ui/components/QuickEdit';
import FullEdit from 'ui/components/FullEdit';
import RequestLog from 'ui/components/RequestLog';
import styled from 'styled-components';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
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

  onEdit = (requestId) => {
    UIState.update({
      viewMode: 'quickEdit',
      selectedRequestId: requestId,
    });
  };

  selectRequest = (requestId) => {
    UIState.update({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
  };

  onSave = () => {
    UIState.update({
      viewMode: 'closed',
      latestRequest: API.getCapturedRequest(UIState.selectedRequestId)
    });
  };

  switchToFullEdit = () => {
    UIState.update({ viewMode: 'mocks' });
  };

  switchToLog = () => {
    UIState.update({ viewMode: 'requests' })
  };

  closeFullEditor = () => {
    UIState.update({ viewMode: 'closed' });
  };

  setEditorSize = (editorSize) => {
    UIState.update({ editorSize });
  };

  setLatestRequest = ({ requestId }) => {
    UIState.update({ latestRequest: API.getCapturedRequest(requestId) });
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
          UIState.viewMode === 'closed' &&
          <LatestRequestNotifications
            onEdit={ this.onEdit }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }/>
        }

        {
          UIState.viewMode === 'quickEdit' &&
          <QuickEdit
            selectedRequestId={ UIState.selectedRequestId }
            latestRequest={ UIState.latestRequest }
            onSelectRequest={ this.selectRequest }
            switchToFullEdit={ this.switchToFullEdit }
            onSave={ this.onSave }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }/>
        }

        {
          UIState.viewMode === 'mocks' &&
          <FullEdit
            closeFullEditor={ this.closeFullEditor }
            setEditorSize={ this.setEditorSize }
            editorSize={ UIState.editorSize }
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }
            activeTab={ UIState.viewMode }/>
        }

        {
          UIState.viewMode === 'requests' &&
          <RequestLog
            showLogs={ this.switchToLog }
            showMocks={ this.switchToFullEdit }
            closeFullEditor={ this.closeFullEditor }
            setEditorSize={ this.setEditorSize }
            editorSize={ UIState.editorSize }
            activeTab={ UIState.viewMode }/>
        }
      </Container>
    );
  }
}

export default UIStateListener(DragDropContext(HTML5Backend)(Mimic));
