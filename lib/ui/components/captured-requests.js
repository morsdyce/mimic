import { API } from 'api/index';
import React from 'react';

import { MethodLabel } from './method-label';

export class CapturedRequests extends React.Component {

  _mockRequest(request) {
    API.mockRequest(request);
  }

  _isAlreadyMocked(request) {
    return !!this._getMockedRequest(request);
  }

  _getMockedRequest(request) {
    return API.mockedRequests
      .filter((mockedRequest) => mockedRequest.requestHash === request.requestHash)[0];
  }

  _actionButtonFor(request) {
    return this._isAlreadyMocked(request)
      ? <button>Edit</button>
      : <button onClick={ this._mockRequest.bind(this, request) }>Mock</button>;
  }

  _requestDetailsFor(request) {
    if (this._isAlreadyMocked(request)) {
      const mockedRequest = this._getMockedRequest(request);

      return mockedRequest.states
        .filter((state) => state.id === mockedRequest.selectedStateId)[0]
        .name;
    }

    return request.url;
  }

  _requestsList() {
    return API.capturedRequests.map((request) => {
      return (
        <div key={ request.id }>
          <MethodLabel method={ request.method } />
          { this._requestDetailsFor(request) }
          { this._actionButtonFor(request) }
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
