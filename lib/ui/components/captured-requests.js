import { API } from 'api/index';
import React from 'react';
import cx from 'classnames';

import { MethodLabel } from 'ui/components/method-label';
import { Url } from 'ui/components/url';
import { ActiveIndicator } from 'ui/components/active-indicator';
import { CapturedRequestDetails } from 'ui/components/details-panel-types/captured-request-details';
import { CapturedMockedRequestDetails } from 'ui/components/details-panel-types/captured-mocked-request-details';
import { RequestRow } from 'ui/components/request-row';

export class CapturedRequests extends React.Component {

  static get propTypes() {
    return {
      editMockedRequest: React.PropTypes.func.isRequired
    }
  }

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
    return API.activeMockedRequests
      .filter((mockedRequest) => mockedRequest.requestHash === request.requestHash)[0];
  }

  _editRequest(requestId) {
    this.props.editMockedRequest(requestId);
  }

  _actionButtonFor(request) {
    return this._isAlreadyMocked(request)
      ? <button className="btn btn-edit" onClick={ this._editRequest.bind(this, this._getMockedRequest(request).id) }>Edit</button>
      : <button className="btn btn-mock" onClick={ this._mockRequest.bind(this, request) }>Mock</button>;
  }

  _requestDetailsFor(request) {
    if (this._isAlreadyMocked(request)) {
      const mockedRequest = this._getMockedRequest(request);

      return mockedRequest.states
        .filter((state) => state.id === mockedRequest.selectedStateId)[0]
        .name;
    }

    return <Url url={ request.url }/>;
  }

  _toggleHideMockedRequests(event) {
    this.setState({ hideMockedRequests: event.target.checked });
  }

  _selectRequest(request) {
    this.setState({ selectedRequest: request });
  }

  _requestRowClassName(requestId) {
    const isSelected = this.state.selectedRequest
      ? this.state.selectedRequest.id === requestId
      : false;

    return cx('request-row', { selected: isSelected });
  }

  _isSelected(requestId) {
    return this.state.selectedRequest
      ? this.state.selectedRequest.id === requestId
      : false;
  }

  _activeIndicator(request) {
    if (!this._isAlreadyMocked(request)) {
      return null;
    }

    return (
      <ActiveIndicator active={ this._getMockedRequest(request).active }
                       onToggle={ () => {} }/>
    );
  }

  _requestsList() {
    const requestList = this.state.hideMockedRequests
      ? API.capturedRequests.filter((request) => !this._isAlreadyMocked(request))
      : API.capturedRequests;

    return requestList.map((request) => {
      return (
        <div key={ request.id }
             onClick={ this._selectRequest.bind(this, request)}>
          <RequestRow requestId={ request.id }
                      selected={ this._isSelected(request.id) }>
            <div className="request-info">
              { this._activeIndicator(request) }
              <MethodLabel method={ request.method }/>
              { this._requestDetailsFor(request) }
            </div>

            { this._actionButtonFor(request) }
          </RequestRow>
        </div>
      );
    })
  }

  _requestDetails() {
    if (!this.state.selectedRequest) {
      return null;
    }

    return this._isAlreadyMocked(this.state.selectedRequest)
      ? <CapturedMockedRequestDetails request={ this._getMockedRequest(this.state.selectedRequest) }
                                      editMockedRequest={ this.props.editMockedRequest }/>
      : <CapturedRequestDetails request={ this.state.selectedRequest }/>;
  }

  render() {
    return (
      <div className="flex">
        <div className="main-content">
          <h2 className="panel-title">All captured requests</h2>

          <label className="hide-mocked-checkbox">
            <input type="checkbox"
                   className="margin-bottom-20"
                   onChange={ this._toggleHideMockedRequests.bind(this) }/>
            Hide mocked requests
          </label>

          { this._requestsList() }
        </div>

        { this._requestDetails() }
      </div>
    );
  }
}
