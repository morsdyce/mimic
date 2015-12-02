import React from 'react';

export class CurrentState extends React.Component {

  static get propTypes() {
    return {
      mockedRequest: React.PropTypes.object.isRequired,
      onStateChange: React.PropTypes.func.isRequired
    }
  }

  _options(states) {
    return states.map((state) => {
        return (
          <option key={ state.id } value={ state.id }>
            { state.name }
          </option>
        );
      });
  }

  _stateChange(event) {
    this.props.onStateChange(event.target.value);
  }

  render() {
    const { mockedRequest } = this.props;

    const currentState = mockedRequest.states
      .filter((state) => state.id === mockedRequest.selectedStateId)[0];

    return (
      <div>
        <select defaultValue={ currentState.id }
                onChange={ this._stateChange.bind(this) }>
          { this._options(mockedRequest.states) }
        </select>

        <button>Edit</button>
      </div>
    );
  }

}
