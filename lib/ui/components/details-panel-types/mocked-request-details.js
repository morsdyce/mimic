import React from 'react';

import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { StatesAccordion } from 'ui/components/details-panel/states-accordion';

export class MockedRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object,
      onUnmock: React.PropTypes.func.isRequired
    }
  }

  _unmock() {
    this.props.onUnmock(this.props.request.id);
  }

  render() {
    if (!this.props.request) {
      return null;
    }

    return (
      <DetailsPanel>
        <a className="btn" onClick={ () => this._unmock() }>Unmock</a>

        <RequestDetails request={ this.props.request }/>
        <StatesAccordion mockedRequest={ this.props.request }/>
      </DetailsPanel>
    );
  }

}
