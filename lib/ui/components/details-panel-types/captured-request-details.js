import { API } from 'api';
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

  _mockRequest() {
    API.mockRequest(this.props.request);
  }

  render() {
    return (
      <DetailsPanel>
        <RequestDetails request={ this.props.request } readOnly={ true }/>
        <ResponseDetails response={ this.props.request.originalResponse } readOnly={ true }/>

        <div className="actions">
          <a className="btn btn-mock" onClick={ () => this._mockRequest() }>
            Mock
          </a>
        </div>
      </DetailsPanel>
    );
  }

}
