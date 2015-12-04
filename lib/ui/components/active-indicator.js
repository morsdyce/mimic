import React from 'react';
import cx from 'classnames';

export class ActiveIndicator extends React.Component {

  static get propTypes() {
    return {
      active: React.PropTypes.bool.isRequired,
      onEnable: React.PropTypes.func.isRequired,
      onDisable: React.PropTypes.func.isRequired
    }
  }

  _indicatorStyle() {
    return cx('active-indicator', { active: this.props.active });
  }

  _toggle() {
    const { active, onEnable: enable, onDisable: disable } = this.props;

    return active ? disable() : enable();
  }

  render() {
    return (
      <div className={ this._indicatorStyle() }
           onClick={ this._toggle.bind(this)}>
      </div>
    );
  }
}
