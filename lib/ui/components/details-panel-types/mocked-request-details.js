import React from 'react';

import Toggle from 'react-toggle';
import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { StatesAccordion } from 'ui/components/details-panel/states-accordion';

export class MockedRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object,
      onToggleRequest: React.PropTypes.func.isRequired,
      onUnmock: React.PropTypes.func.isRequired
    }
  }

  _unmock() {
    this.props.onUnmock(this.props.request.id);
  }

  _toggleRequest() {
    this.props.onToggleRequest(this.props.request.id);
  }

  render() {
    if (!this.props.request) {
      return null;
    }

    return (
      <DetailsPanel>
        <Toggle checked={ this.props.request.active }
                onChange={ () => this._toggleRequest() }/>

        <a className="btn btn-unmock" onClick={ () => this._unmock() }>Unmock</a>

        <RequestDetails request={ this.props.request }/>
        <StatesAccordion mockedRequest={ this.props.request }/>
      </DetailsPanel>
    );
  }

}
