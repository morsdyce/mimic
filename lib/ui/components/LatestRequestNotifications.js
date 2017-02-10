import React from 'react';
import styled  from 'styled-components';
import throttle from 'lodash/throttle';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import menuIcon from 'ui/assets/images/menu.png';

const Container = styled.div`
  display: flex;
  position: fixed;
  left: 2px;
  bottom: 2px;
  font-family: Arial, sans-serif;
  font-size: 12px;
  opacity: ${(props) => Number(!props.fadingOut)};
  transition: opacity ${(props) => props.fadingOut ? 2 : 0.1}s ease-in-out;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 0 8px;
  height: 20px;
  margin-right: 3px;
  border-radius: 4px;
  
  &:hover {
    cursor: pointer;
    background-color: #c8dcf4;
  }
`;

const Method = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const URL = styled.div`
  margin-right: 20px;
`;

const Status = styled.div`
  color: inherit;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
`;

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      latestRequest: null,
      fadingOut: true
    };

    this.lastX = 0;
    this.lastY = 0;
    this.canFadeOut = true;

    this.setLatestRequest         = this.setLatestRequest.bind(this);
    this.resetFadeoutTimer        = this.resetFadeoutTimer.bind(this);
    this.stopFadeoutTimer         = this.stopFadeoutTimer.bind(this);
    this.resetFadeoutTimerByMouse = throttle(this.resetFadeoutTimerByMouse.bind(this), 30);
  }

  componentDidMount() {
    this.props.API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);

    document.addEventListener('mousemove', this.resetFadeoutTimerByMouse);
  }

  componentWillReceiveProps() {
    this.resetFadeoutTimer();
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);

    document.removeEventListener('mousemove', this.resetFadeoutTimerByMouse);
    this.stopFadeoutTimer(true);
  }

  resetFadeoutTimer() {
    clearTimeout(this.willFadeOut);
    clearTimeout(this.willDisappear);

    this.canFadeOut = true;

    this.setState({ fadingOut: false }, () => {
      this.willFadeOut = setTimeout(() => this.setState({ fadingOut: true }, () => {
        this.willDisappear = setTimeout(() => this.setState({ latestRequest: null }), 2000);
      }), 3000);
    });
  }

  stopFadeoutTimer(unmounting) {
    clearTimeout(this.willFadeOut);
    clearTimeout(this.willDisappear);
    
    this.canFadeOut = false;

    if (!unmounting) {
      this.setState({ fadingOut: false });
    }
  }

  resetFadeoutTimerByMouse(event) {
    if (!this.canFadeOut || !this.state.latestRequest) {
      return;
    }

    const halfHeight = Math.round(window.innerHeight / 2);
    const halfWidth  = Math.round(window.innerWidth - window.innerWidth / 2);

    const deltaX = event.clientX - this.lastX;
    const deltaY = event.clientY - this.lastY;

    const inBottomLeftCorner = event.clientX < halfHeight && event.clientY > halfWidth;
    const movingToCorner     = deltaX <= 0 && deltaY >= 0;

    if (inBottomLeftCorner && movingToCorner) {
      this.resetFadeoutTimer();
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  setLatestRequest({ requestId }) {
    this.setState({ latestRequest: this.props.API.getCapturedRequest(requestId) });
  }

  render() {
    if (!this.state.latestRequest) {
      return null;
    }

    return (
      <Container fadingOut={ this.state.fadingOut }
                 onMouseEnter={ this.stopFadeoutTimer }
                 onMouseLeave={ this.resetFadeoutTimer }>
        <Control onClick={ () => this.props.onEdit(this.state.latestRequest.id, { openRequestLog: true }) }>
          <Icon src={ menuIcon } alt="Request History"/>
        </Control>

        <Control onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>
          <Method>{ this.state.latestRequest.method }</Method>
          <URL>{ this.state.latestRequest.url }</URL>

          {
            this.state.latestRequest.response &&
            <Status>{ this.state.latestRequest.response.status }</Status>
          }

          {
            !this.state.latestRequest.response &&
            <Icon src={ spinIcon } alt="Pending Request"/>
          }

          <Icon src={ editIcon } alt="Mock Response"/>
        </Control>
      </Container>
    );
  }
}

export default LatestRequestNotifications;
