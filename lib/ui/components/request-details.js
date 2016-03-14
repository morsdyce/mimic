import 'ui/assets/stylesheets/components/request-details.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/collection/map';

import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import { Tabs, Tab, TextField } from 'material-ui';

import brace from 'brace';
import AceEditor from 'morsdyce-react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

import { RequestActions } from 'ui/components/request-details/request-actions';
import { RequestInfo } from 'ui/components/request-details/request-info';
import { RequestHeaders } from 'ui/components/request-details/request-headers';

import { navigate } from 'ui/actions/location';
import { mockRequest, updateMock } from 'ui/actions/api';
import { get as _get }  from 'lodash';

class RequestDetails extends Component {

  constructor(props) {
    super(props);

    debugger;

    this.state = this._initRequest(props);
  }

  _initRequest(props) {
    return {
      selectedScenario: _get(props.scenarios[0], 'id'),
      url: props.url,
      headers: props.headers,
      status: _get(props.mock, 'response.status', props.originalResponse.status),
      delay: _get(props.mock, 'response.delay', props.originalResponse.delay),
      responseBody: _get(props.mock, 'response.body', props.originalResponse.body)
    };
  }

  componentWillReceiveProps(props) {
    this.setState(this._initRequest(props));
  }

  _handleCancel() {
    this.props.navigate('scenarios');
  }

  _handleSave() {

    if (this.props.mock) {
      this.props.updateMock(this.state.selectedScenario, this.props.mock.id, {
        url: this.state.url,
        headers: this.state.headers,
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
        url: this.state.url,
        method: this.props.method,
        headers: this.state.headers,
        params: this.props.params,
        response: {
          delay: 0,
          status: 200,
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
      const newKey = event.target.value;

      headers[newKey] = oldValue;
    }

    if (type === 'value') {
      headers[key] = event.target.value;
    }

    this.setState({ headers });
  }

  _responseBodyChange(event) {
    this.setState({
      responseBody: event.target.value
    });
  }

  _requestInfoChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  _renderHeaders() {
    return map(this.state.headers, (value, key) => {
      return (
        <div className="row" key={ key }>
          <div className="col-xs-3">
            <TextField
              hintText="Header"
              value={ key }
              onBlur={ this._headersChange.bind(this, key, 'key') }
            />
          </div>

          <div className="col-xs">
            <TextField
              hintText="Value"
              style={{ width: '80%'}}
              value={ value }/>
          </div>
        </div>
      );
    });
  }

  render() {
    const { method, params, originalResponse, scenarios, mock } = this.props;

    return (
      <div className="request-details">

        <RequestActions
          onCancel={ this._handleCancel.bind(this) }
          onSave={ this._handleSave.bind(this) }
          onChange={ this._selectScenario.bind(this) }
          scenarios={ scenarios }
          mocked={ !!mock }
          selectedScenario={ this.state.selectedScenario }/>

        <RequestInfo url={ this.state.url }
                     method={ method }
                     params={ params }
                     status={ this.state.status }
                     delay={ this.state.delay }
                     onUrlChange={ this._requestInfoChange.bind(this, 'url') }
                     onDelayChange={ this._requestInfoChange.bind(this, 'delay') }
                     onStatusChange={ this._requestInfoChange.bind(this, 'status') }/>

        <div className="row request-details-body">
          <div className="col-xs">
            <Tabs inkBarStyle={ { backgroundColor: '#52B665' }}
                  tabItemContainerStyle={ { backgroundColor: '#fff', borderBottom: '1px solid #52B665' }}>
              <Tab label="Response Headers" value="a" style={{ color: '#000'}}>
                { this._renderHeaders() }
              </Tab>
              <Tab label="Response Body" value="b" style={{ color: '#000'}}>
                <div>
              <textarea
                onChange={ this._responseBodyChange.bind(this) }
                value={ this.state.responseBody }
                style={{ width: '100%', height: '50%', border: '1px solid #52B665', borderTop: 'none', outline: 'none'}}>
              </textarea>
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
  updateMock
})(RequestDetails);
