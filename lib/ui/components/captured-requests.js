import React from 'react';

import { MethodLabel } from './method-label';

export class CapturedRequests extends React.Component {

  static get propTypes() {
    return {
      capturedRequests: React.PropTypes.array.isRequired
    }
  }

  _requestsList() {
    return this.props.capturedRequests.map((request) => {
      return (
        <div key={ request.id }>
          <MethodLabel method={ request.method } />
          { request.url }
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>All captured requests</h1>
        <label>
          <input type="checkbox"/> Hide mocked requests
        </label>

        { this._requestsList() }
      </div>
    );
  }
}
