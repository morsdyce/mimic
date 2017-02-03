import React from 'react';
import EVENTS from 'api/constants/events';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';

const containerStyle = {
  position: 'fixed',
  display: 'flex',
  height: '20px',
  alignItems: 'center',
  left: '5px',
  bottom: '5px',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '4px'
};

const containerHoverStyle = {
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
  height: '16px'
};

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      hovered: false,
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

  onMouseEnter() {
    this.setState({ hovered: true });
  }

  onMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const style = this.state.hovered
      ? Object.assign({}, containerStyle, containerHoverStyle)
      : containerStyle;

    if (!this.state.latestRequest) {
      return null;
    }

    return (
      <div style={ style }
           onMouseEnter={ this.onMouseEnter }
           onMouseLeave={ this.onMouseLeave }
           onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>
        <div style={ methodStyle }>{ this.state.latestRequest.method }</div>
        <div style={ urlStyle }>{ this.state.latestRequest.url }</div>

        {
          this.state.latestRequest.response
            ? <img src={ editIcon } style={ iconStyle } alt="Mock Response"/>
            : <img src={ spinIcon } style={ iconStyle } alt="Pending Request"/>
        }
      </div>
    );
  }
}

export default LatestRequestNotifications;
