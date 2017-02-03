import React from 'react';

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
  fontWeight: 'bold'
};

const urlStyle = {
  display: 'inline-block'
};

const actionsStyle = {
  display: 'inline-block'
};

class LatestRequestNotifications extends React.Component {
  constructor() {
    super();

    this.state = {
      hovered: false
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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
        <div style={ methodStyle }>POST</div>
        <div style={ urlStyle }>save-text?id=new</div>
        <div style={ actionsStyle }>Edit</div>
      </div>
    );
  }
}

export default LatestRequestNotifications;
