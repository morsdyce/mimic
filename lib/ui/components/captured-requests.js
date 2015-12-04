import { API } from 'api/index';
import React from 'react';

import { MethodLabel } from 'ui/components/method-label';
import { ActiveIndicator } from 'ui/components/active-indicator';

export class CapturedRequests extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hideMockedRequests: false
    };
  }

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
      ? <button className="btn btn-edit">Edit</button>
      : <button className="btn btn-mock" onClick={ this._mockRequest.bind(this, request) }>Mock</button>;
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

  _toggleHideMockedRequests(event) {
    this.setState({ hideMockedRequests: event.target.checked });
  }

  _requestsList() {
    const requestList = this.state.hideMockedRequests
      ? API.capturedRequests.filter((request) => !this._isAlreadyMocked(request))
      : API.capturedRequests;

    return requestList.map((request) => {
      return (
        <div key={ request.id }
             className="request-row">
          <div>
            <ActiveIndicator active={ this._isAlreadyMocked(request) }
                             onEnable={ () => {} }
                             onDisable={ () => {} }/>
            <MethodLabel method={ request.method }/>
            { this._requestDetailsFor(request) }
          </div>

          { this._actionButtonFor(request) }
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <h2 className="panel-title">All captured requests</h2>

        <label className="hide-mocked-checkbox">
          <input type="checkbox"
                 className="margin-bottom-20"
                 onChange={ this._toggleHideMockedRequests.bind(this) }/>
          Hide mocked requests
        </label>

        { this._requestsList() }
      </div>
    );
  }
}
