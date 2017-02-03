import React from 'react';
import _ from 'lodash';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import leftIcon from 'ui/assets/images/left@2x.png';
import rightIcon from 'ui/assets/images/right@2x.png';

const containerStyle = {
  display: 'flex',
  position: 'fixed',
  left: '3px',
  bottom: '3px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px'
};

const backgroundStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f7f7f7',
  padding: '0 8px',
  height: '20px',
  marginRight: '3px',
  borderRadius: '4px'
};

const backgroundHoverStyle = {
  cursor: 'pointer',
  backgroundColor: '#c8dcf4'
};

const methodStyle = {
  fontWeight: 'bold',
  marginRight: '10px'
};

const urlStyle = {
  marginRight: '20px'
};

const iconStyle = {
  height: '16px',
  userSelect: '0'
};

const disabledIconStyle = Object.assign({}, iconStyle, {
  opacity: 0.3
});

const leftIconStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  marginRight: 0
};

const rightIconStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0
};

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      previousRequestHovered: false,
      nextRequestHovered: false,
      currentRequestHovered: false,
      latestRequest: null
    };

    this.onMouseEnter          = this.onMouseEnter.bind(this);
    this.onMouseLeave          = this.onMouseLeave.bind(this);
    this.setLatestRequest      = this.setLatestRequest.bind(this);
    this.selectPreviousRequest = this.selectPreviousRequest.bind(this);
    this.selectNextRequest     = this.selectNextRequest.bind(this);
  }

  componentDidMount() {
    this.props.API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  get selectedRequestIndex() {
    return _.findIndex(this.props.API.capturedRequests, {
      id: this.state.latestRequest.id
    });
  }


  get isFirstCapturedRequest() {
    return this.selectedRequestIndex === 0;
  }

  get isLastCapturedRequest() {
    return this.selectedRequestIndex === this.props.API.capturedRequests.length - 1;
  }

  setLatestRequest({ requestId }) {
    this.setState({ latestRequest: this.props.API.getCapturedRequest(requestId) });
  }

  selectPreviousRequest() {
    if (this.isFirstCapturedRequest) {
      return;
    }

    this.setState({
      latestRequest: this.props.API.capturedRequests[this.selectedRequestIndex - 1]
    });
  }

  selectNextRequest() {
    if (this.isLastCapturedRequest) {
      return;
    }

    this.setState({
      latestRequest: this.props.API.capturedRequests[this.selectedRequestIndex + 1]
    });
  }

  onMouseEnter(element) {
    return () => this.setState({ [`${element}Hovered`]: true });
  }

  onMouseLeave(element) {
    return () => this.setState({ [`${element}Hovered`]: false });
  }

  render() {
    if (!this.state.latestRequest) {
      return null;
    }

    const previousIconStyle = this.state.previousRequestHovered && !this.isFirstCapturedRequest
      ? Object.assign({}, backgroundStyle, leftIconStyle, backgroundHoverStyle)
      : Object.assign({}, backgroundStyle, leftIconStyle);

    const nextIconStyle = this.state.nextRequestHovered && !this.isLastCapturedRequest
      ? Object.assign({}, backgroundStyle, rightIconStyle, backgroundHoverStyle)
      : Object.assign({}, backgroundStyle, rightIconStyle);

    const currentRequestStyle = this.state.currentRequestHovered
      ? Object.assign({}, backgroundStyle, backgroundHoverStyle)
      : backgroundStyle;

    return (
      <div style={ containerStyle }>
        <div style={ previousIconStyle }
             onClick={ this.selectPreviousRequest }
             onMouseEnter={ this.onMouseEnter('previousRequest') }
             onMouseLeave={ this.onMouseLeave('previousRequest') }>
          <img src={ leftIcon }
               style={ this.isFirstCapturedRequest ? disabledIconStyle : iconStyle }
               alt="Previous Request"/>
        </div>

        <div style={ nextIconStyle }
             onClick={ this.selectNextRequest }
             onMouseEnter={ this.onMouseEnter('nextRequest') }
             onMouseLeave={ this.onMouseLeave('nextRequest') }>
          <img src={ rightIcon }
               style={ this.isLastCapturedRequest ? disabledIconStyle : iconStyle }
               alt="Next Request"/>
        </div>

        <div style={ currentRequestStyle }
             onMouseEnter={ this.onMouseEnter('currentRequest') }
             onMouseLeave={ this.onMouseLeave('currentRequest') }
             onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>

          <div style={ methodStyle }>{ this.state.latestRequest.method }</div>
          <div style={ urlStyle }>{ this.state.latestRequest.url }</div>

          {
            this.state.latestRequest.response
              ? <img src={ editIcon } style={ iconStyle } alt="Mock Response"/>
              : <img src={ spinIcon } style={ iconStyle } alt="Pending Request"/>
          }
        </div>
      </div>
    );
  }
}

export default LatestRequestNotifications;
