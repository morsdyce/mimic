import React from 'react';
import EVENTS from 'api/constants/events';
import LatestRequestNotifications from 'ui/components/LatestRequestNotifications';
import MimicControls from 'ui/components/MimicControls';
import QuickEdit from 'ui/components/QuickEdit';
import FullEdit from 'ui/components/FullEdit';
import RequestLog from 'ui/components/RequestLog';
import Settings from 'ui/components/Settings';
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
  font-size: 13px;
  line-height: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
`;

class Mimic extends React.Component {

  selectRequest = (requestId) => {
    UIState.update({ selectedRequestId: requestId });
    this.setLatestRequest({ requestId });
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
        <MimicControls/>

        { UIState.viewMode === 'closed' && <LatestRequestNotifications /> }

        {
          UIState.viewMode === 'quickEdit' &&
          <QuickEdit
            selectedRequestId={ UIState.selectedRequestId }
            onSelectRequest={ this.selectRequest }/>
        }

        { UIState.viewMode === 'mocks' && <FullEdit /> }
        { UIState.viewMode === 'requests' && <RequestLog /> }
        { UIState.viewMode === 'settings' && <Settings /> }
      </Container>
    );
  }
}

export default UIStateListener(DragDropContext(HTML5Backend)(Mimic));
