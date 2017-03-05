import React from 'react';
import styled from 'styled-components';
import API from 'api';
import EVENTS from 'api/constants/events';
import RequestLogState from 'ui/states/RequestLogState';
import { connectToState } from 'ui/states/connector';
import { filterLogByType } from 'ui/utils/filters';
import Frame from 'ui/components/common/Frame';
import HeaderCell from 'ui/components/RequestLogs/HeaderCell';
import RequestRow from 'ui/components/RequestLogs/RequestRow';
import SearchInput from 'ui/components/BottomBar/SearchInput';
import IconDropdown from 'ui/components/common/IconDropdown';

const ScrollableContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(
    to bottom,
    white,
    white 50%,
    #f0f0f0 50%,
    #f0f0f0
  );
  background-size: 100% 50px;
`;

const HeaderRow = styled.div`
  background-color: white;
  border-bottom: ${(props) => props.theme.darkBorder};
  height: 24px;
  width: 100%;
  display: flex;
`;

class RequestLog extends React.Component {

  state = {
    selectedRequestId: null
  };

  componentDidMount() {
    API.on(EVENTS.REQUEST_CAPTURED, RequestLogState.triggerUpdates);
    API.on(EVENTS.RESPONSE_RECEIVED, RequestLogState.triggerUpdates);
  }

  componentWillUnmount() {
    API.off(EVENTS.REQUEST_CAPTURED, RequestLogState.triggerUpdates);
    API.off(EVENTS.RESPONSE_RECEIVED, RequestLogState.triggerUpdates);
  }

  selectRequest = (request) => () => this.setState({ selectedRequestId: request.id });
  onQueryChange = (event) => RequestLogState.updateQuery(event.target.value);
  clearQuery = () => RequestLogState.updateQuery('');

  renderCapturedRequests = (renderRequestRow) => {
    return API.capturedRequests
      .filter((request) => request.url.includes(RequestLogState.query))
      .filter(filterLogByType)
      .map(renderRequestRow)
      .reverse();
  };

  controls = () => (
    <div style={{ display: 'flex' }}>
      <SearchInput query={ RequestLogState.query }
                   onBlur={ this.hideFilters }
                   onFocus={ this.showFilters }
                   onChange={ this.onQueryChange }
                   onClearQuery={ this.clearQuery }/>
      <IconDropdown icon="filter"
                    value={ RequestLogState.filter }
                    position="right"
                    align="left"
                    anchorPoint="bottom"
                    onChange={ RequestLogState.updateFilter }
                    options={ ['All', 'Mocked', 'Unmocked', 'Successful', 'Failing'] }/>
    </div>

  );

  render() {
    return (
      <Frame controls={ this.controls() }>
        <HeaderRow>
          <HeaderCell cell="time">Time</HeaderCell>
          <HeaderCell cell="url">URL</HeaderCell>
          <HeaderCell cell="params">Request Params</HeaderCell>
          <HeaderCell cell="status">Status</HeaderCell>
          <HeaderCell cell="delay">Delay</HeaderCell>
          <HeaderCell autosize>Response Body</HeaderCell>
        </HeaderRow>

        <ScrollableContainer>
          {
            this.renderCapturedRequests((request) => (
              <RequestRow key={ request.id }
                          request={ request }
                          onSelect={ this.selectRequest }
                          selected={ this.state.selectedRequestId === request.id }/>
            ))
          }
        </ScrollableContainer>
      </Frame>
    );
  }
}

export default connectToState(RequestLogState, RequestLog);
