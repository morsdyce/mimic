import React from 'react';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import menuIcon from 'ui/assets/images/left@2x.png';

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
  userSelect: 'none'
};

const menuIconStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  marginRight: 0
};

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      menuIconHovered: false,
      currentRequestHovered: false,
      latestRequest: null
    };

    this.onMouseEnter     = this.onMouseEnter.bind(this);
    this.onMouseLeave     = this.onMouseLeave.bind(this);
    this.setLatestRequest = this.setLatestRequest.bind(this);
  }

  componentDidMount() {
    this.props.API.on(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.on(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.REQUEST_CAPTURED, this.setLatestRequest);
    this.props.API.off(EVENTS.RESPONSE_RECEIVED, this.setLatestRequest);
  }

  setLatestRequest({ requestId }) {
    this.setState({ latestRequest: this.props.API.getCapturedRequest(requestId) });
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

    const menuIconStyle = this.state.menuIconHovered
      ? Object.assign({}, backgroundStyle, menuIconStyle, backgroundHoverStyle)
      : Object.assign({}, backgroundStyle, menuIconStyle);

    const currentRequestStyle = this.state.currentRequestHovered
      ? Object.assign({}, backgroundStyle, backgroundHoverStyle)
      : backgroundStyle;

    return (
      <div style={ containerStyle }>
        <div style={ menuIconStyle }
             onClick={ this.selectPreviousRequest }
             onMouseEnter={ this.onMouseEnter('menuIcon') }
             onMouseLeave={ this.onMouseLeave('menuIcon') }>
          <img src={ menuIcon }
               style={ iconStyle }
               onClick={ () => this.props.onEdit(this.state.latestRequest.id, { openRequestLog: true }) }
               alt="Request History"/>
        </div>

        <div style={ currentRequestStyle }
             onMouseEnter={ this.onMouseEnter('currentRequest') }
             onMouseLeave={ this.onMouseLeave('currentRequest') }
             onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>

          <div style={ methodStyle }>{ this.state.latestRequest.method }</div>
          <div style={ urlStyle }>{ this.state.latestRequest.url }</div>

          {
            this.state.latestRequest.response &&
            <div style={ urlStyle }>{ this.state.latestRequest.response.status }</div>
          }

          {
            !this.state.latestRequest.response &&
            <img src={ spinIcon } style={ iconStyle } alt="Pending Request"/>
          }

          <img src={ editIcon } style={ iconStyle } alt="Mock Response"/>
        </div>
      </div>
    );
  }
}

export default LatestRequestNotifications;
