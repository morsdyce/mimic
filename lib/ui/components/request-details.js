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
import { mockRequest } from 'ui/actions/api';
import get from 'lodash/object/get';

class RequestDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedScenario: get(props.scenarios[0], 'id'),
      url: props.url,
      headers: props.headers,
      responseBody: props.originalResponse.body
    }
  }

  _handleCancel() {
    this.props.navigate('scenarios');
  }

  _handleSave() {
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

    this.props.navigate('scenarios');
  }

  _selectScenario(event) {
    this.setState({
      selectedScenario: event.target.value
    });
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

  _urlChange(event) {
    this.setState({
      url: event.target.value
    })
  }

  _renderHeaders() {
    return map(this.state.headers, (value, key) => {
      return (
        <div className="row" key={ key }>
          <div className="col-xs-3">
            <TextField
              hintText="Header"
              defaultValue={ key }
              onBlur={ this._headersChange.bind(this, key, 'key') }
            />
          </div>

          <div className="col-xs">
            <TextField
              hintText="Value"
              style={{ width: '80%'}}
              defaultValue={ value }/>
          </div>
        </div>
      );
    });
  }

  render() {
    const { method, params, originalResponse, scenarios } = this.props;

    return (
      <div className="request-details">

        <RequestActions
          onCancel={ this._handleCancel.bind(this) }
          onSave={ this._handleSave.bind(this) }
          onChange={ this._selectScenario.bind(this) }
          scenarios={ scenarios } />

        <RequestInfo url={ this.state.url }
                     method={ method }
                     params={ params }
                     status={ originalResponse.status }
                     delay={ originalResponse.delay }
                     onUrlChange={ this._urlChange.bind(this) }/>

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
                onblur={ this._responseBodyChange.bind(this) }
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

export default connect(mapStateToProps, { navigate, mockRequest })(RequestDetails);
