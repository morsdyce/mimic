import React from 'react';

import { MethodLabel } from './method-label';

export class MockedRequests extends React.Component {

  static get propTypes() {
    return {
      mockedRequests: React.PropTypes.array.isRequired
    }
  }

  _requestsList() {
    return this.props.mockedRequests.map((request) => {
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
        <h1>All mocked requests</h1>

        { this._requestsList() }
      </div>
    );
  }
}
