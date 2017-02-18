import React from 'react';
import styled  from 'styled-components';
import throttle from 'lodash/throttle';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import MimicControls from 'ui/components/MimicControls';
import get from 'lodash/get';
import withAPI from 'ui/components/withAPI';

const Container = styled.div`
  font-family: Arial, sans-serif;
  font-size: 12px;
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
  height: 25px;
  border-right: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
  cursor: pointer;
  ${(props) => props.rounded ? 'border-radius: 0 0 0 11px' : ''}
  
  &:hover {
    background-color: #c8dcf4;
  }
`;

const Method = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const URL = styled.div`
  margin-right: 20px;
  ${(props) => props.status > 400 ? 'color: #c00;' : '' }
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

  renderRequests() {
    if (!this.state.latestRequest) {
      return null;
    }

    const status = get(this.state.latestRequest, 'response.status');

    return (
      <Container
        fadingOut={ this.state.fadingOut }
        onMouseEnter={ this.stopFadeoutTimer }
        onMouseLeave={ this.resetFadeoutTimer }>
        <Control onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>
          <Icon src={ editIcon } alt="Mock Response"/>
          <Method>{ this.state.latestRequest.method }</Method>
          <URL status={ status }>{ this.state.latestRequest.url }</URL>

          {
            status &&
            <Status>{ status }</Status>
          }

          {
            !this.state.latestRequest.response &&
            <Icon src={ spinIcon } alt="Pending Request"/>
          }
        </Control>
      </Container>
    );
  }

  render() {
    return (
      <div>
        <MimicControls
          showLogs={ this.props.showLogs }
          showMocks={ this.props.showMocks }/>
        { this.renderRequests() }
      </div>

    )
  }
}

export default withAPI(LatestRequestNotifications);
