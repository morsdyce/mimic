import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, Tab, Tabs, List, ListItem, Divider } from 'material-ui';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import { includes as _includes } from 'lodash';

import { fetch } from 'ui/actions/api';
import { navigate } from 'ui/actions/location';
import { Request } from 'ui/components/request';

export class Requests extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="search">
              <Paper zDepth={2}>
                <input type="text" onChange={ this.setSearchText.bind(this) } />
                <SearchIcon className="search-icon" />
              </Paper>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Paper zDepth={2} rounded={false}>
              <div style={{overflowY: 'scroll', height: '100%'}}>
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
    if (!this.state.searchText) {
      return this.props.capturedRequests;
    }

    return this.props.capturedRequests.filter((request) => _includes(request.url, this.state.searchText));
  }

  _renderRequests() {
    return this.getFilteredRequests().map((request) => (
      <div key={ request.id }>
        { /* <ListItem className="request-row" rightIconButton={<div></div>}>
          <Request url={ request.url }
                   method={ request.method }
                   params={ request.params }
                   mocked={ !!request.mock }
                   handleClick={ this._handleClick.bind(this, request ) }/>
        </ListItem>
        */ }
        
        <Request url={ request.url }
                 method={ request.method }
                 params={ request.params }
                 mocked={ !!request.mock }
                 handleClick={ this._handleClick.bind(this, request ) }/>
        <Divider />
      </div>
    ));
  }

}

const mapStateToProps = (store) => ({ capturedRequests: store.capturedRequests });

export default connect(mapStateToProps, { fetch, navigate })(Requests);
