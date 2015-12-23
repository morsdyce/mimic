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

    // TODO: Make Select component render correct options by props change
    // Currently we provide a key that will force the component to render
    // again by unmounting it
    return (
      <div className="state-selector">
        <Select key={ this.props.states.length }
                options={ this.props.states }
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
