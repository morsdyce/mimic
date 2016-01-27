import { API } from 'api/index';
import React from 'react';
import cx from 'classnames';
import Uniqe from 'lodash/array/unique';

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
      .filter((mockedRequest) => mockedRequest.matches(request))[0];
  }

  _editRequest(requestId) {
    this.props.editMockedRequest(requestId);
  }

  _actionButtonFor(request) {
    return this._isAlreadyMocked.bind(this, request)()
      ? <button className="btn btn-edit" onClick={ this._editRequest.bind(this, request.id) }>Edit</button>
      : <button className="btn btn-mock" onClick={ this._mockRequest.bind(this, request) }>Mock</button>;
  }

  _mockedResponseNameFor(request) {
    const mockedRequest = this._getMockedRequest(request);
    if (mockedRequest) {
      const name = mockedRequest.getCurrentState().name;
      return <div className="mocked-response-name">{ name }</div>;
    }

    return null;
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

  _getUniqueRequests(requests) {
    return Uniqe(requests, false, (request) => request.requestHash);
  }

  _requestsList() {
    const requestList = this.state.hideMockedRequests
      ? this._getUniqueRequests(API.capturedRequests.filter((request) => !this._isAlreadyMocked(request)))
      : this._getUniqueRequests(API.capturedRequests);

    return requestList.map((request) => {
      return (
        <div key={ request.id }
             onClick={ this._selectRequest.bind(this, request)}>
          <RequestRow requestId={ request.id }
                      selected={ this._isSelected(request.id) }>
            <div className="request-info">
              <ActiveIndicator active={ this._isAlreadyMocked(request) }
                               onToggle={ () => {} }/>
              <MethodLabel method={ request.method }/>
              <Url url={ request.url }/>
            </div>

            <div className="buttons">
              { this._actionButtonFor(request) }
            </div>
          </RequestRow>
          { this._mockedResponseNameFor(request) }
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
