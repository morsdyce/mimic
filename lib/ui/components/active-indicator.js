import React from 'react';
import cx from 'classnames';

export class ActiveIndicator extends React.Component {

  static get propTypes() {
    return {
      active: React.PropTypes.bool.isRequired,
      onToggle: React.PropTypes.func.isRequired,
      showOnlyActive: React.PropTypes.bool
    }
  }

  _indicatorStyle() {
    return cx(
      'active-indicator',
      {
        active: this.props.active,
        invisible: this.props.showOnlyActive && !this.props.active
      }
    );
  }

  _toggle() {
    this.props.onToggle();
  }

  render() {
    return (
      <div className={ this._indicatorStyle() }
           onClick={ this._toggle.bind(this)}>
      </div>
    );
  }
}
