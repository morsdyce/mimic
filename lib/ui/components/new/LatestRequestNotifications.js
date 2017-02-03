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
      hovered: false
    };

    this.onMouseEnter     = this.onMouseEnter.bind(this);
    this.onMouseLeave     = this.onMouseLeave.bind(this);
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

    if (!this.props.latestRequest) {
      return null;
    }

    return (
      <div style={ style }
           onMouseEnter={ this.onMouseEnter }
           onMouseLeave={ this.onMouseLeave }
           onClick={ () => this.props.onEdit(this.props.latestRequest.id) }>
        <div style={ methodStyle }>{ this.props.latestRequest.method }</div>
        <div style={ urlStyle }>{ this.props.latestRequest.url }</div>

        {
          this.props.latestRequest.response
            ? <img src={ editIcon } style={ iconStyle } alt="Mock Response"/>
            : <img src={ spinIcon } style={ iconStyle } alt="Pending Request"/>
        }
      </div>
    );
  }
}

export default LatestRequestNotifications;
