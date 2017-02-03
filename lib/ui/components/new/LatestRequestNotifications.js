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
      latestResponse: null
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    // this.props.API.on(EVENTS.REQUEST_SENT, (event) => console.log('REQUEST_SENT', event));

    this.props.API.on(EVENTS.RESPONSE_RECEIVED, ({ response }) => {
      this.setState({ latestResponse: response })
    });
  }

  componentWillUnmount() {
    this.props.API.off(EVENTS.RESPONSE_RECEIVED);
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
           onClick={ this.props.onEdit }>
        {
          this.state.latestResponse &&
          <div>
            <div style={ methodStyle }>{ this.state.latestResponse.status }</div>
            <div style={ urlStyle }>{ this.state.latestResponse.finalUrl }</div>
            <div style={ actionsStyle }>Edit</div>
          </div>
        }
      </div>
    );
  }
}

export default LatestRequestNotifications;
