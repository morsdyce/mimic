import React from 'react';
import { ThemeProvider } from 'styled-components';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import MimicControls from 'ui/components/common/MimicControls';
import QuickEdit from 'ui/components/QuickEdit/QuickEdit';
import Mocks from 'ui/components/Mocks/Mocks';
import RequestLog from 'ui/components/Logs/RequestLog';
import Settings from 'ui/components/Settings/Settings';
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
  z-index: 2147483646;
  background-color: white;
  font-size: 13px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
`;

const theme = {
  blue: '#2d7bd1',
  selectionBlue: '#cbddf5',
  red: '#ba3a00',
  lightGray: '#f0f0f0',
  lightBorder: '1px solid #f0f0f0',
  darkBorder: '1px solid #dedede'
};

class Mimic extends React.Component {

  selectRequest = (requestId) => {
    UIState.update({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
  };

  setLatestRequest = ({ requestId }) => {
    UIState.update({ latestRequest: API.getCapturedRequest(requestId) });
  };

  toggleOnHotKey = (event) => {
    if (event.altKey && event.code === 'KeyM') {
      UIState.update({ viewMode: UIState.viewMode === 'closed' ? 'requests' : 'closed' });
    }
  };

  componentDidMount() {
    window.addEventListener('keypress', this.toggleOnHotKey);
    API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.toggleOnHotKey);
    API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  render() {
    return (
      <ThemeProvider theme={ theme }>
        <Container>
          {
            (UIState.viewMode !== 'closed' ||
            UIState.settings.alwaysShowMimicButtons) &&
            <MimicControls/>
          }

          { UIState.viewMode === 'closed' && <LatestRequestNotifications /> }

          {
            UIState.viewMode === 'quickEdit' &&
            <QuickEdit
              selectedRequestId={ UIState.selectedRequestId }
              onSelectRequest={ this.selectRequest }/>
          }

          { UIState.viewMode === 'mocks' && <Mocks /> }
          { UIState.viewMode === 'requests' && <RequestLog /> }
          { UIState.viewMode === 'settings' && <Settings /> }
        </Container>
      </ThemeProvider>
    );
  }
}

export default UIStateListener(DragDropContext(HTML5Backend)(Mimic));
