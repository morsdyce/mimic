import { API } from 'api';
import React from 'react';

import { EditState } from 'ui/components/details-panel/edit-state';

export class StatesAccordion extends React.Component {

  static get propTypes() {
    return {
      mockedRequest: React.PropTypes.object.isRequired
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      states: this.props.mockedRequest.states
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ states: newProps.mockedRequest.states });
  }

  _createState() {
    const newState = {
      name: 'New State',
      response: {
        status: 200,
        delay: 0,
        headers: '{}',
        body: ''
      }
    };

    API.addStateToMockedRequest(this.props.mockedRequest.id, newState);
  }

  _expandState(stateId) {
    this.state.states.forEach((state) => state.expanded = false);

    this.state.states
      .filter((state) => state.id === stateId)[0]
      .expanded = true;

    this.forceUpdate();
  }

  _accordion() {
    return this.state.states.map((state) => {
      return (
        <EditState key={ state.id }
                   mockedRequest={ this.props.mockedRequest }
                   mockedRequestState={ state }
                   onExpand={ this._expandState.bind(this) }
                   expanded={ state.expanded }/>
      );
    });
  }

  render() {
    return (
      <div className="states-accordion">
        { this._accordion() }
        <div className="state" onClick={ this._createState.bind(this) }>
          <div className="state-name">+ Create new state</div>
        </div>
      </div>
    );
  }

}
