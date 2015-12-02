import React from 'react';

export class ActiveIndicator extends React.Component {

  static get propTypes() {
    return {
      active: React.PropTypes.bool.isRequired,
      onEnable: React.PropTypes.func.isRequired,
      onDisable: React.PropTypes.func.isRequired
    }
  }

  _indicatorStyle() {
    return {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      cursor: 'pointer',
      backgroundColor: this.props.active ? '#0EB835' : '#CECECE'
    }
  }

  _toggle() {
    const { active, onEnable: enable, onDisable: disable } = this.props;

    return active ? disable() : enable();
  }

  render() {
    return (
      <div style={ this._indicatorStyle() }
           onClick={ this._toggle.bind(this)}>
      </div>
    );
  }
}
