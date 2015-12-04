import React from 'react';

import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { ResponseDetails } from 'ui/components/details-panel/response-details';

export class CapturedRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object
    }
  }

  render() {
    return (
      <DetailsPanel>
        <RequestDetails request={ this.props.request } readOnly={ true }/>
        <ResponseDetails response={ this.props.request.originalResponse } readOnly={ true }/>

        <a className="btn btn-mock">Mock</a>
      </DetailsPanel>
    );
  }

}
