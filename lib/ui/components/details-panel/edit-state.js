import React from 'react';
import { API } from 'api';
import { NotificationActions } from 'ui/actions/notification';

import { ResponseDetails } from 'ui/components/details-panel/response-details';

export class EditState extends React.Component {

  static get propTypes() {
    return {
      mockedRequest: React.PropTypes.object.isRequired,
      mockedRequestState: React.PropTypes.object.isRequired,
      onExpand: React.PropTypes.func.isRequired,
      expanded: React.PropTypes.bool
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      editedState: {
        name: this.props.mockedRequestState.name,
        response: Object.assign({}, this.props.mockedRequestState.response)
      }
    }
  }

  _expandState() {
    this.props.onExpand(this.props.mockedRequestState.id);
  }

  _removeState() {
    const state = this.props.mockedRequestState;

    API.removeStateFromMockedRequest(this.props.mockedRequest.id, state.id);
  }

  _saveState() {
    API.updateStateInMockedRequest(
      this.props.mockedRequest.id,
      this.props.mockedRequestState.id,
      this.state.editedState
    );

    NotificationActions.createSimple({
      title: 'Saved state',
      message: `Saved ${this.state.editedState.name} successfully`
    });
  }

  _updateProperty(property, value) {
    if (property === 'name') {
      value = value.target.value;
    }

    this.setState({
      editedState: Object.assign({}, this.state.editedState, { [property]: value })
    });
  }

  render() {
    const state = this.state.editedState;

    if (!this.props.expanded) {
      return (
        <div className="state" onClick={ this._expandState.bind(this) }>
          <div className="state-name">
            { state.name }
            <i className="fa fa-pencil"></i>
          </div>
        </div>
      );
    }

    return (
      <div className="state expanded">
        <div className="state-name">
          <input type="text"
                 value={ state.name }
                 onChange={ this._updateProperty.bind(this, 'name') }/>
        </div>

        <ResponseDetails response={ state.response }
                         onChange={ this._updateProperty.bind(this, 'response') }/>

        <div className="state-actions">
          <a className="save" onClick={ this._saveState.bind(this) }>
            Save
          </a>

          <a className="remove" onClick={ this._removeState.bind(this) }>
            Remove State
          </a>
        </div>
      </div>
    );
  }

}
