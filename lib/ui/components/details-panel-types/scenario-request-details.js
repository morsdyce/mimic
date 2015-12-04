import React from 'react';

import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { ResponseDetails } from 'ui/components/details-panel/response-details';
import { CurrentState } from 'ui/components/details-panel/current-state';

export class ScenarioRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object
    }
  }

  render() {
    if (!this.props.request) {
      return null;
    }

    return (
      <DetailsPanel>
        <RequestDetails request={ this.props.request } readOnly={ true }/>
        <CurrentState mockedRequest={ this.props.request }/>
        <ResponseDetails response={ this.props.request.getResponse() } readOnly={ true }/>

        <a className="btn">Remove from scenario</a>
      </DetailsPanel>
    );
  }

}
