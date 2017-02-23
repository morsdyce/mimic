import React from 'react';
import styled  from 'styled-components';
import MethodLabel from 'ui/components/styled/MethodLabel';
import throttle from 'lodash/throttle';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import MimicControls from 'ui/components/MimicControls';
import get from 'lodash/get';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-size: 13px;
  line-height: 20px;
  left: 95px;
  bottom: 0;
  position: fixed;
  opacity: ${(props) => Number(!props.fadingOut)};
  transition: opacity ${(props) => props.fadingOut ? 2 : 0.1}s ease-in-out;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 0 8px;
  height: 24px;
  border-right: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
  cursor: pointer;
  ${(props) => props.rounded ? 'border-radius: 0 0 0 11px' : ''}
  
  &:hover {
    background-color: #c8dcf4;
  }
`;

const URL = styled.div`
  margin-right: 20px;
  ${(props) => props.status > 400 ? 'color: #c00;' : '' }
`;

const Status = styled.div`
  color: ${(props) => props.children > 400 ? '#ba3a00' : '' };
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
`;

const MockIcon = styled(Icon)`
  margin-right: 6px;
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
  };

  onEdit = () => {
    UIState.update({
      viewMode: 'quickEdit',
      selectedRequestId: this.state.latestRequest.id,
    });
  };

  renderRequests = () => {
    if (!this.state.latestRequest) {
      return null;
    }

    const status = get(this.state.latestRequest, 'response.status');
    const mock = this.state.latestRequest.mock;

    return (
      <Container
        fadingOut={ this.state.fadingOut }
        onMouseEnter={ this.stopFadeoutTimer }
        onMouseLeave={ this.resetFadeoutTimer }>
        <Control onClick={ this.onEdit }>
          {
            mock && mock.active &&
            <MockIcon src={ mockedIcon } alt="Mocked Request"/>
          }

          {
            mock && !mock.active &&
            <MockIcon src={ unmockedIcon } alt="Unocked Request"/>
          }

          <MethodLabel>{ this.state.latestRequest.method }</MethodLabel>
          <URL status={ status }>{ this.state.latestRequest.url }</URL>

          {
            status &&
            <Status>{ status }</Status>
          }

          {
            !this.state.latestRequest.response &&
            <Icon src={ spinIcon } alt="Pending Request"/>
          }
          <Icon src={ editIcon } alt="Mock Response"/>
        </Control>
      </Container>
    );
  };

  render() {
    return (
      <div>
        <MimicControls/>
        { this.renderRequests() }
      </div>

    )
  }
}

export default UIStateListener(LatestRequestNotifications);
