import 'ui/assets/stylesheets/components/request-details.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import IconButton from 'material-ui/lib/icon-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import RemoveIcon from 'material-ui/lib/svg-icons/content/clear';
import Select from 'react-select';

import { RequestActions } from 'ui/components/request-details/request-actions';
import { RequestInfo } from 'ui/components/request-details/request-info';
import { Editor } from 'ui/components/editor';

import { navigate } from 'ui/actions/location';
import { mockRequest, updateMock, removeMock } from 'ui/actions/api';
import _get from 'lodash/get';
import map from 'lodash/map';
import StandardHeaders from 'standard-headers';

const responseHeaders = StandardHeaders.response.map((header) => ({ value: header, label: header }));

class RequestDetails extends Component {

  constructor(props) {
    super(props);

    this.state = this._initRequest(props);
  }

  _initRequest(props) {
    return {
      selectedScenario: this.getCurrentScenario(props.mock) || _get(props.scenarios[0], 'id'),
      originalScenario: this.getCurrentScenario(props.mock) || _get(props.scenarios[0], 'id'),
      name: _get(props.mock, 'name', props.name),
      url: _get(props.mock, 'url', props.url),
      headers: _get(props.mock, 'response.headers', props.response.headers),
      status: _get(props.mock, 'response.status', props.response.status),
      delay: _get(props.mock, 'response.delay', props.response.delay),
      params: _get(props.mock, 'params', props.params),
      responseBody: _get(props.mock, 'response.body', props.response.body),
      showRequestParams: false,
      origin: _get(props.mock, 'origin', props.origin)
    };
  }

  getCurrentScenario(mock) {
    if (!mock) {
      return null;
    }

    const scenario = this.props.scenarios
      .filter(scenario => scenario.mockedRequests
        .filter(request => request.id === mock.id).length
      )[0];

    return _get(scenario, 'id', null);
  }

  componentWillReceiveProps(props) {
    this.setState(this._initRequest(props));
  }

  _handleCancel() {
    this.props.navigate('scenarios');
  }

  _handleDuplicate() {
    this.props.navigate('request-details', {
      method: this.props.method,
      name: this.state.name,
      url: this.state.url,
      headers: this.state.headers,
      params: this.state.params,
      response: {
        delay: this.state.delay,
        status: this.state.status,
        body: this.state.responseBody
      }
    });
  }

  _handleDelete() {
    this.props.removeMock(this.state.originalScenario, this.props.mock.id);
    this.props.navigate('scenarios');
  }

  _handleSave() {
    if (this.props.mock && this.state.selectedScenario === this.state.originalScenario) {
      this.props.updateMock(this.state.selectedScenario, this.props.mock.id, {
        name: this.state.name,
        url: this.state.url,
        headers: this.state.headers,
        params: this.state.params,
        origin: this.state.origin,
        response: {
          delay: this.state.delay,
          status: this.state.status,
          body: this.state.responseBody
        }
      });
    } else {
      this.props.mockRequest(this.state.selectedScenario, {
        requestId: this.props.id,
        active: true,
        name: this.state.name,
        url: this.state.url,
        method: this.props.method,
        headers: this.state.headers,
        params: this.state.params,
        origin: this.state.origin,
        response: {
          delay: this.state.delay,
          status: this.state.status,
          body: this.state.responseBody
        }
      });
    }

    this.props.navigate('scenarios');
  }

  _selectScenario(selectedScenario) {
    this.setState({ selectedScenario });
  }

  _headersChange(key, type, event) {
    const headers = this.state.headers;

    if (type === 'key') {
      const oldValue = headers[key];
      delete headers[key];
      const newKey = event.target ? event.target.value : event;

      headers[newKey] = oldValue;
    }

    if (type === 'value') {
      headers[key] = event.target.value;
    }

    this.setState({ headers });
  }

  _responseBodyChange(responseBody) {
    this.setState({ responseBody });
  }

  _requestParamsChange(params) {
    this.setState({ params });
  }

  _requestInfoChange(key, event) {
    this.setState({ [key]: event.target ? event.target.value : event });
  }

  _toggleShowRequestParams() {
    this.setState({ showRequestParams: !this.state.showRequestParams });
  }

  _getContentType(type) {
    switch (type) {
      case 'html':
        return 'text/html';

      case 'xml':
        return 'text/xml';

      case 'json':
        return 'application/json';

      case 'text':
        return 'text/plain'
    }
  }

  _setHeaderPreset(preset) {
    this.setState({
      headers: {
        pragma: 'no-cache',
        'content-type': `${this._getContentType(preset)}; charset=utf-8`,
        'cache-control': 'no-cache',
        expires: -1
      }
    })
  }

  addHeader() {
    const headers = Object.assign({}, this.state.headers, { '': '' });
    this.setState({ headers });
  }

  removeHeader(key) {
    const headers = Object.assign({}, this.state.headers);
    delete headers[key];

    this.setState({ headers });
  }

  _renderHeaders() {
    const headers = map(this.state.headers, (value, key) => ({ key, value }));

    return headers.map((header, index) => {
      return (
        <div className="row" key={ index }>
          <div className="col-xs-3">
            <Select
              value={ header.key }
              options={ responseHeaders }
              clearable={ false }
              allowCreate
              onChange={ this._headersChange.bind(this, header.key, 'key') } />
          </div>

          <div className="col-xs">
            <TextField
              hintText="Value"
              style={{ width: '80%' }}
              value={ header.value }
              onChange={ this._headersChange.bind(this, header.key, 'value') }/>
          </div>

          <IconButton className="remove-header" tooltip="Remove" onClick={ () => this.removeHeader(header.key) }>
            <RemoveIcon />
          </IconButton>
        </div>
      );
    });
  }

  renderRequestParams() {
    if (!this.state.showRequestParams) {
      return null;
    }

    return (
      <div className="row request-details-params">
        <div className="request-params-title">
          Request Body
        </div>
        <Editor mode="javascript"
                height="100"
                value={ this.state.params }
                onChange={ this._requestParamsChange.bind(this) }/>
      </div>
    );
  }

  render() {
    const { method, params, scenarios, mock } = this.props;

    return (
      <div className="request-details" key={ this.props.id }>

        <RequestActions
          onCancel={ this._handleCancel.bind(this) }
          onSave={ this._handleSave.bind(this) }
          onDelete={ this._handleDelete.bind(this) }
          onChange={ this._selectScenario.bind(this) }
          onDuplicate={ this._handleDuplicate.bind(this) }
          scenarios={ scenarios }
          mocked={ !!mock }
          selectedScenario={ this.state.selectedScenario }/>

        <RequestInfo url={ this.state.url }
                     name={ this.state.name }
                     method={ method }
                     params={ params }
                     status={ this.state.status }
                     delay={ this.state.delay }
                     showRequestParams = { this.state.showRequestParams }
                     onUrlChange={ this._requestInfoChange.bind(this, 'url') }
                     onDelayChange={ this._requestInfoChange.bind(this, 'delay') }
                     onStatusChange={ this._requestInfoChange.bind(this, 'status') }
                     onToggleRequestParams={ this._toggleShowRequestParams.bind(this) }
                     onNameChange={ this._requestInfoChange.bind(this, 'name') } />


        { this.renderRequestParams() }

        <div className="row request-details-body">
          <div className="col-xs-6">
            <div className="request-details-title">
              Response Body
            </div>
            <div
              style={{
                width: '100%',
                height: '50%',
                borderTop: 'none',
                outline: 'none'
              }}>

              <Editor mode="javascript"
                      value={ this.state.responseBody }
                      onChange={ this._responseBodyChange.bind(this) }/>

            </div>
          </div>
          <div className="col-xs-6">
            <Tabs inkBarStyle={ { backgroundColor: '#52B665' }}
                  tabItemContainerStyle={ {
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #52B665'
                  }}>
              <Tab label="Response Headers" value="a" style={{ color: '#000' }}>
                <div>
                  <h4 className="header-presets">
                    <span>Header Presets</span>
                    <RaisedButton label="JSON" onClick={ () => this._setHeaderPreset('json') } />
                    <RaisedButton label="XML" onClick={ () => this._setHeaderPreset('xml') } />
                    <RaisedButton label="HTML" onClick={ () => this._setHeaderPreset('html') } />
                    <RaisedButton label="Text" onClick={ () => this._setHeaderPreset('text') } />
                  </h4>
                </div>
                   { this._renderHeaders() }

                   <div>
                     <FloatingActionButton mini={true} onClick={ () => this.addHeader() }>
                       <ContentAdd />
                     </FloatingActionButton>
                   </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  scenarios: state.scenarios
});

export default connect(mapStateToProps, {
  navigate,
  mockRequest,
  updateMock,
  removeMock
})(RequestDetails);
