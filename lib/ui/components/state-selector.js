import React from 'react';

export class StateSelector extends React.Component {

  static get propTypes() {
    return {
      states: React.PropTypes.array.isRequired,
      selectedStateId: React.PropTypes.string.isRequired
    }
  }

  _getSelectedState() {
    const { states, selectedStateId } = this.props;

    return states.filter((state) => state.id === selectedStateId)[0];
  }

  render() {
    const state = this._getSelectedState();

    return (
      <div>
        { state.name }
      </div>
    );
  }
}
