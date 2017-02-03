import React from 'react';
import EVENTS from 'api/constants/events';

const containerStyle = {
  position: 'fixed',
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
  display: 'inline-block',
  fontWeight: 'bold',
  marginRight: '10px'
};

const urlStyle = {
  display: 'inline-block',
  marginRight: '20px'
};

const actionsStyle = {
  display: 'inline-block'
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

    return (
      <div style={ style }
           onMouseEnter={ this.onMouseEnter }
           onMouseLeave={ this.onMouseLeave }
           onClick={ () => this.props.onEdit(this.state.latestRequest.id) }>
        {
          this.state.latestRequest &&
          <div>
            <div style={ methodStyle }>{ this.state.latestRequest.method }</div>
            <div style={ urlStyle }>{ this.state.latestRequest.url }</div>
            <div
              style={ actionsStyle }>{ this.state.latestRequest.response ? 'Edit' : 'Pending' }</div>
          </div>
        }
      </div>
    );
  }
}

export default LatestRequestNotifications;
