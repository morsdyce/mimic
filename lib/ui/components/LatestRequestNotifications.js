import React from 'react';
import styled  from 'styled-components';
import URLStamp from 'ui/components/common/URLStamp';
import Icon from 'ui/components/common/Icon';
import throttle from 'lodash/throttle';
import EVENTS from 'api/constants/events';
import get from 'lodash/get';
import API from 'api';
import UIState from 'ui/states/UIState';
import QuickEditState from 'ui/states/QuickEditState';
import SettingsState from 'ui/states/SettingsState';
import { connectToState } from 'ui/states/connector';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  left: ${() => SettingsState.alwaysShowMimicButtons ? '102px' : '0'};
  bottom: 0;
  position: fixed;
  opacity: ${(props) => Number(!props.fadingOut)};
  transition: opacity ${(props) => props.fadingOut ? 2 : 0.1}s ease-in-out;
  max-width: 500px;
`;

const Control = styled(Div)`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 0 8px;
  height: 25px;
  cursor: pointer;
  ${(props) => props.rounded ? 'border-radius: 0 0 0 11px' : ''}

  &:hover {
    background-color: #c8dcf4;
  }
`;

const Status = styled(Div)`
  margin-left: 20px;
  color: ${(props) => props.children > 400 ? props.theme.red : '' };
`;

class LatestRequestNotifications extends React.Component {

  lastX = 0;
  lastY = 0;
  canFadeOut = true;

  state = {
    latestRequest: null,
    fadingOut: true
  };

  componentDidMount() {
    API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);

    document.addEventListener('mousemove', this.resetFadeoutTimerByMouse);
  }

  componentWillReceiveProps() {
    this.resetFadeoutTimer();
  }

  componentWillUnmount() {
    API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);

    document.removeEventListener('mousemove', this.resetFadeoutTimerByMouse);
    this.stopFadeoutTimer(true);
  }

  resetFadeoutTimer = () => {
    clearTimeout(this.willFadeOut);
    clearTimeout(this.willDisappear);

    this.canFadeOut = true;

    this.setState({ fadingOut: false }, () => {
      this.willFadeOut = setTimeout(() => this.setState({ fadingOut: true }, () => {
        this.willDisappear = setTimeout(() => this.setState({ latestRequest: null }), 2000);
      }), 3000);
    });
  };

  stopFadeoutTimer = (unmounting) => {
    clearTimeout(this.willFadeOut);
    clearTimeout(this.willDisappear);

    this.canFadeOut = false;

    if (!unmounting) {
      this.setState({ fadingOut: false });
    }
  };

  resetFadeoutTimerByMouse = throttle((event) => {
    if (!this.canFadeOut || !this.state.latestRequest) {
      return;
    }

    const halfHeight = Math.round(window.innerHeight / 2);
    const halfWidth = Math.round(window.innerWidth - window.innerWidth / 2);

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;

    const inBottomLeftCorner = event.clientY > halfHeight && event.clientX < halfWidth;
    const movingToCorner = deltaX <= 0 && deltaY >= 0;

    if (inBottomLeftCorner && movingToCorner) {
      this.resetFadeoutTimer();
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }, 30);

  setLatestRequest = ({ requestId }) => {
    this.setState({ latestRequest: API.getCapturedRequest(requestId) });
    this.resetFadeoutTimer();
  };

  onEdit = () => {
    UIState.setViewMode('quickEdit');
    QuickEditState.selectRequest(this.state.latestRequest.id);
  };

  render() {
    if (!this.state.latestRequest) {
      return null
    }

    const status = get(this.state.latestRequest, 'response.status');
    const mock = get(this.state.latestRequest, 'mock');

    return (
      <Container fadingOut={ this.state.fadingOut }
                 onMouseEnter={ this.stopFadeoutTimer }
                 onMouseLeave={ this.resetFadeoutTimer }>
        <Control onClick={ this.onEdit }>

          { mock && mock.isActive && <Icon style={{ marginRight: 6, fill: '#4b82d5' }} src="mocked"/> }
          { mock && !mock.isActive && <Icon style={{ marginRight: 6, fill: '#b0b0b0' }} src="unmocked"/> }

          <URLStamp request={ this.state.latestRequest}/>

          { status && <Status>{ status }</Status> }
          { !this.state.latestRequest.response.status && <Icon style={{ marginLeft: 20 }} src="spin"/> }

          <Icon src="edit" style={{ marginLeft: 4 }}/>
        </Control>
      </Container>
    );
  }
}

export default connectToState(UIState, LatestRequestNotifications);
