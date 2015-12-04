import React from 'react';

import { DetailsPanel } from 'ui/components/details-panel/details-panel';
import { RequestDetails } from 'ui/components/details-panel/request-details';
import { ResponseDetails } from 'ui/components/details-panel/response-details';

export class CapturedMockedRequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object,
      editMockedRequest: React.PropTypes.func.isRequired
    }
  }

  _editRequest() {
    this.props.editMockedRequest(this.props.request.id);
  }

  render() {
    return (
      <DetailsPanel>
        <RequestDetails request={ this.props.request } readOnly={ true }/>
        <ResponseDetails response={ this.props.request.getResponse() } readOnly={ true }/>

        <a className="btn btn-edit" onClick={ () => this._editRequest() }>Edit</a>
      </DetailsPanel>
    );
  }

}
