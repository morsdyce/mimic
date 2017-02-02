import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import _includes from 'lodash/includes';
import get from 'lodash/get';
import Select from 'react-select';

import {fetch} from 'ui/actions/api';
import {navigate} from 'ui/actions/location';
import {Request} from 'ui/components/request';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Requests' },
  { value: 'error', label: 'Failed Requests' },
  { value: 'mocked', label: 'Mocked Requests' },
  { value: 'unmocked', label: 'Unmocked Requests' }
];

export class Requests extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      filter: 'all'
    };

    this._filterRequest       = this._filterRequest.bind(this);
    this._changeFilterRequest = this._changeFilterRequest.bind(this);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="search">
              <Paper zDepth={2}>
                <input type="text" onChange={ this.setSearchText.bind(this) }/>
                <SearchIcon className="search-icon"/>
              </Paper>
            </div>

            <Select
              value={ this.state.filter }
              options={ FILTER_OPTIONS }
              clearable={ false }
              searchable={ false }
              onChange={ this._changeFilterRequest } />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Paper zDepth={2} rounded={false}>
              <div style={{overflowY: 'scroll', height: '88vh'}}>
                { this._renderHelpText() }
                { this._renderRequests() }
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }

  setSearchText(event) {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount() {
    this.props.fetch();
  }

  _handleClick(request) {
    this.props.navigate('request-details', request);
  }

  getFilteredRequests() {
    return this.props.capturedRequests
      .filter(this._filterRequest)
      .filter((request) => _includes(request.url, this.state.searchText || ''));
  }

  _filterRequest(request) {
    switch (this.state.filter) {
      case 'all':
        return true;

      case 'error':
        return request.response.status >= 400;

      case 'mocked':
        return !!request.mock;

      case 'unmocked':
        return !request.mock;

      default:
        return true;
    }
  }

  _changeFilterRequest(newFilterValue) {
    this.setState({ filter: newFilterValue });
  }

  _renderRequests() {
    const requests = this.getFilteredRequests();

    if (!requests.length) {
      return (
        <div style={{ padding: '10px' }}>
          <p style={{ fontSize: '1.3em', fontWeight: 700 }}>No requests captured</p>
          <p style={{ fontSize: '1.2em' }}>Go ahead and make some requests from your application, and you will be able to mock them from here.</p>
          <Divider />
        </div>
      )
    }

    return requests.map((request) => {

      const styles = {
        padding: !!request.mock ? '0': '9px 0'
      };

      return (
        <div key={ request.id } style={ styles }>
          <Request url={ request.url }
                   name={ get(request, 'mock.name') }
                   method={ request.method }
                   params={ request.params }
                   mocked={ !!request.mock }
                   handleClick={ this._handleClick.bind(this, request ) }/>
          <Divider />
        </div>
      )
    });
  }

  _renderHelpText() {
    const requests = this.getFilteredRequests();
    const mockedRequests = requests.reduce((result, request) => {
      if (request.mock) {
        result += 1;
      }

      return result;
    }, 0);

    if (mockedRequests > 0 || !requests.length) {
      return null;
    }

    return (
      <div style={{
        background: '#2196f3',
        padding: '6px',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 300
      }}>
        Click one of the captured requests in order to mock it
      </div>
    );
  }

}

const mapStateToProps = (store) => ({ capturedRequests: store.capturedRequests });

export default connect(mapStateToProps, { fetch, navigate })(Requests);
