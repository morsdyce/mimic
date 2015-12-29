import React from 'react';
import isObject from 'lodash/lang/isObject';

import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';

export class RequestDetails extends React.Component {

  static get propTypes() {
    return {
      request: React.PropTypes.object.isRequired,
      readOnly: React.PropTypes.bool
    }
  }

  _parameters() {
    const { request } = this.props;

    if (!request.params) {
      return null;
    }

    return (
      <div>
        <p>Parameters:</p>
        <textarea defaultValue={ request.params } />
      </div>
    );
  }

  render() {
    const { method, url } = this.props.request;

    return (
      <div className="request-details">
        <h4>Request</h4>

        <div>
          <MethodLabel method={ method } />
          <Url url={ url }/>
        </div>

        { this._parameters() }
      </div>
    );
  }

}
