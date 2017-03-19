import React from 'react';
import { ThemeProvider } from 'styled-components';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import MimicControls from 'ui/components/BottomBar/MimicControls';
import QuickEdit from 'ui/components/QuickEdit/QuickEdit';
import Mocks from 'ui/components/Mocks/Mocks';
import RequestLog from 'ui/components/RequestLogs/RequestLog';
import Settings from 'ui/components/Settings/Settings';
import styled from 'styled-components';
import API from 'api';
import UIState from 'ui/states/UIState';
import SettingsState from 'ui/states/SettingsState';
import QuickEditState from 'ui/states/QuickEditState';
import { connectToState } from 'ui/states/connector';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2147483646;
  background-color: white;
  font-size: 13px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
  
  * {
    &:after,
    &::after,
    &:before,
    &::before {
      all: initial
    }
  }
`;

const BufferSpace = styled(Div)`
  height: ${(props) => props.closed ? '25px' : `${props.editorHeight}px`};
`;

const theme = {
  blue: '#2d7bd1',
  selectionBlue: '#cbddf5',
  mockedBlue: '#4b82d5',
  red: '#ba3a00',
  lightGray: '#f0f0f0',
  darkGray: '#dedede',
  lightBorder: '1px solid #f0f0f0',
  darkBorder: '1px solid #dedede'
};

class Mimic extends React.Component {

  selectRequest = (requestId) => {
    QuickEditState.selectRequest(requestId);
    this.setLatestRequest({ requestId });
  };

  setLatestRequest = ({ requestId }) => {
    UIState.updateLatestRequest(API.getCapturedRequest(requestId));
  };

  toggleOnHotKey = (event) => {
    if (event.altKey && event.shiftKey && event.keyCode === 194) {
      UIState.setViewMode(UIState.viewMode === 'closed' ? 'requests' : 'closed');
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
        <Div>
          <BufferSpace editorHeight={ UIState.editorHeight } closed={ UIState.viewMode === 'closed' } />
          <Container>
            {
              (UIState.viewMode !== 'closed' ||
              SettingsState.alwaysShowMimicButtons) &&
              <MimicControls/>
            }

            { UIState.viewMode === 'closed' && <LatestRequestNotifications/> }

            {
              UIState.viewMode === 'quickEdit' &&
              <QuickEdit
                selectedRequestId={ QuickEditState.selectedRequestId }
                onSelectRequest={ this.selectRequest }/>
            }

            { UIState.viewMode === 'mocks' && <Mocks/> }
            { UIState.viewMode === 'requests' && <RequestLog/> }
            { UIState.viewMode === 'settings' && <Settings/> }
          </Container>
        </Div>
      </ThemeProvider>
    );
  }
}

export default connectToState(UIState, DragDropContext(HTML5Backend)(Mimic));
