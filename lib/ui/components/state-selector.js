import React from 'react';

import Select from 'react-select';

export class StateSelector extends React.Component {

  static get propTypes() {
    return {
      states: React.PropTypes.array.isRequired,
      onSelectState: React.PropTypes.func,
      selectedStateId: React.PropTypes.string.isRequired
    }
  }

  _getSelectedState() {
    const { states, selectedStateId } = this.props;

    return states.filter((state) => state.id === selectedStateId)[0];
  }

  _selectState(stateId) {
    this.props.onSelectState(stateId);
  }

  render() {
    const state = this._getSelectedState();

    return (
      <div className="state-selector">
        <Select options={ this.props.states }
                onChange={ this._selectState.bind(this) }
                value={ state.id }
                valueKey="id"
                labelKey="name"
                searchable={ false }
                clearable={ false }/>
      </div>
    );
  }
}
