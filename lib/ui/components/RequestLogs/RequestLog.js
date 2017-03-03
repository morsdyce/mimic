import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/common/Frame';
import API from 'api';
import UIState from 'ui/states/UIState';
import RequestLogState from 'ui/states/RequestLogState';
import MocksState from 'ui/states/MocksState';
import { connectToState } from 'ui/states/connector';
import { getHighlightedText, convertDelayToSeconds } from 'ui/utils/string';
import Icon from 'ui/components/common/Icon';
import RequestsFilter, { filterByType } from 'ui/components/RequestLogs/RequestsFilter';
import ResizeableCell from 'ui/components/RequestLogs/ResizeableCell';
import every from 'lodash/every';
import BlueButton from 'ui/components/common/BlueButton';

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
  background-size: 100% 48px;
  
  ${() => !!RequestLogState.query ? 'background: none;' : ''}
`;

const rowColor = ({ status, mock }) => {
  if (mock) {
    return '#4B82D5';
  }

  if (status >= 400 && status < 600) {
    return '#D54900'
  }

  return 'inherit';
};

const RequestRow = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  cursor: pointer;
  div {
    color: ${ rowColor };
  }
  
  &:nth-child(even) {
    background-color: #f0f0f0;
  }
  
  &:nth-child(odd) {
    background-color: white;
  }
  
  ${(props) => props.selected ? 'background-color: #d9e5f6 !important;' : ''}
  
  &:last-child {
    border-bottom: ${(props) => !!RequestLogState.query ? props.theme.darkBorder : 'none'};
  }
`;

const Actions = styled.div`
  width: 400px;
  height: 23px;
  display: flex;
  align-items: center;
  padding-right: 3px;
`;

const HeaderRow = styled.div`
  background-color: white;
  border-bottom: ${(props) => props.theme.darkBorder};
  height: 24px;
  width: 100%;
  display: flex;
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  outline: none;
  padding-left: 5px;
`;

const MockButton = styled(BlueButton)`
  color: #fff !important;
`;

class RequestLog extends React.Component {

  state = {
    filterReferences: 0,
    selectedRequestId: null
  };

  selectRequest = (request) => {
    return () => {
      this.setState({ selectedRequestId: request.id });
    }
  };

  editRequest = (request) => (event) => {
    if (event.nativeEvent.srcElement.dataset.resizeHandle) {
      return;
    }

    const matchingMocks = API.getMatchingMocks(request);
    const hasDisabledMatchingMocks = matchingMocks.length && every(matchingMocks, { active: false });

    if (hasDisabledMatchingMocks) {
      const mock = matchingMocks[0];

      if (mock.groupId) {
        MocksState.expandGroup(mock.groupId);
      }
      MocksState.selectItems([mock]);
      MocksState.updateQuery(request.url);
      UIState.setViewMode('mocks');
      return;
    }

    if (!request.mockId) {
      API.mockRequest(request);
    }

    const mockId = API.getCapturedRequest(request.id).mockId;
    const mock = API.getMock(mockId);

    MocksState.selectItems([mock]);

    if (mock.groupId) {
      MocksState.expandGroup(mock.groupId);
    }
    UIState.setViewMode('mocks');
  };

  onQueryChange = (event) => {
    RequestLogState.updateQuery(event.target.value);
  };

  clearQuery = () => {
    RequestLogState.updateQuery('');
  };

  showFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences + 1 });
  };

  hideFilters = () => {
    this.setState({ filterReferences: this.state.filterReferences - 1 });
  };

  controls = () => (
    <Actions>
      <Icon src="search"/>
      <Search value={ RequestLogState.query }
              placeholder="Find"
              onBlur={  this.hideFilters }
              onFocus={ this.showFilters }
              onChange={ this.onQueryChange }/>

      { RequestLogState.query && <Icon src="clear" onClick={ this.clearQuery }/> }
    </Actions>
  );

  filters = () => {
    // Only show filters bar if input is not focused, filter not hovered and filter is for 'All'
    if (this.state.filterReferences === 0 && RequestLogState.filter === 'All') {
      return null;
    }

    return <RequestsFilter onMouseEnter={ this.showFilters } onMouseLeave={ this.hideFilters }/>
  };

  renderDate(timestamp) {
    if (!timestamp) {
      return;
    }

    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  render() {
    return (
      <Frame controls={ this.controls() } filters={ this.filters() }>
        <HeaderRow>
          <ResizeableCell cell="time">Time</ResizeableCell>
          <ResizeableCell cell="url">URL</ResizeableCell>
          <ResizeableCell cell="params">Request Params</ResizeableCell>
          <ResizeableCell cell="status">Status</ResizeableCell>
          <ResizeableCell cell="delay">Delay</ResizeableCell>
          <ResizeableCell autosize>Response Body</ResizeableCell>
        </HeaderRow>

        <ScrollableContainer>
          {
            API.capturedRequests
              .filter((request) => request.url.includes(RequestLogState.query))
              .filter(filterByType)
              .map((request) => {
                const { method, url, params, mock, startTime, response: { status, delay, body } } = request;
                const selected = this.state.selectedRequestId === request.id;

                return (
                  <RequestRow key={ request.id }
                              onClick={ this.selectRequest(request) }
                              onDoubleClick={ this.editRequest(request) }
                              status={ status }
                              selected={ selected }
                              mock={ mock }>
                    <ResizeableCell cell="time" status={ status }>{ this.renderDate(startTime) }</ResizeableCell>
                    <ResizeableCell cell="url" method={ method } innerHTML={
                      getHighlightedText(url, RequestLogState.query)
                    } status={ status }/>
                    <ResizeableCell cell="params" status={ status }>{ params }</ResizeableCell>
                    <ResizeableCell cell="status" status={ status }>{ status }</ResizeableCell>
                    <ResizeableCell cell="delay" status={ status }>{ convertDelayToSeconds(delay) }</ResizeableCell>
                    <ResizeableCell autosize status={ status }>{ body }</ResizeableCell>
                    {
                      selected && (
                        <MockButton
                          onClick={ this.editRequest(request) }>
                          { request.mockId ? 'Edit...' : 'Mock...' }
                        </MockButton>
                      )
                    }
                  </RequestRow>
                )
              }).reverse()
          }
        </ScrollableContainer>
      </Frame>
    );
  }
}

export default connectToState(RequestLogState, RequestLog);
