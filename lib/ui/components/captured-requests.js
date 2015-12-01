import React from 'react';

import { MethodLabel } from './method-label';

export class CapturedRequests extends React.Component {

  static get propTypes() {
    return {
      capturedRequests: React.PropTypes.array.isRequired,
      mockRequest: React.PropTypes.func.isRequired,
    }
  }

  _mockRequest(request) {
    this.props.mockRequest(request);
  }

  _requestsList() {
    return this.props.capturedRequests.map((request) => {
      return (
        <div key={ request.id }>
          <MethodLabel method={ request.method } />
          { request.url }

          <button onClick={ this._mockRequest.bind(this, request) }>Mock</button>
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
