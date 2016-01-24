import React from 'react';

import Toggle from 'react-toggle';
import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { StatesAccordion } from 'ui/components/details-panel/states-accordion';

export class MockedRequestDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }

  static get propTypes() {
    return {
      request: React.PropTypes.object,
      onToggleRequest: React.PropTypes.func.isRequired,
      onUnmock: React.PropTypes.func.isRequired
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.request &&
        newProps.request &&
        newProps.request.id != this.props.request.id) {
      this.setState({ editMode: false });
    }
  }

  _unmock() {
    this.props.onUnmock(this.props.request.id);
  }

  _toggleRequest() {
    this.props.onToggleRequest(this.props.request.id);
  }

  _expandState(value) {
    this.setState({ editMode: value });
  }

  render() {
    if (!this.props.request) {
      return null;
    }

    return (
      <DetailsPanel expanded={ this.state.editMode } >
        <Toggle checked={ this.props.request.active }
                onChange={ () => this._toggleRequest() }/>

        <a className="btn btn-unmock" onClick={ () => this._unmock() }>Unmock</a>

        <RequestDetails request={ this.props.request }/>
        <StatesAccordion
          mockedRequest={ this.props.request }
          onExpand={ this._expandState.bind(this) }/>
      </DetailsPanel>
    );
  }

}
