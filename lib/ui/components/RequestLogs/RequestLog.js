import React from 'react';
import styled from 'styled-components';
import every from 'lodash/every';
import API from 'api';
import UIState from 'ui/states/UIState';
import RequestLogState from 'ui/states/RequestLogState';
import MocksState from 'ui/states/MocksState';
import { connectToState } from 'ui/states/connector';
import { convertDelayToSeconds } from 'ui/utils/string';
import { filterLogByType } from 'ui/utils/filters';
import Frame from 'ui/components/common/Frame';
import Cell from 'ui/components/RequestLogs/Cell';
import HeaderCell from 'ui/components/RequestLogs/HeaderCell';
import URLStamp from 'ui/components/common/URLStamp';
import BlueButton from 'ui/components/common/BlueButton';
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
  background-size: 100% 48px;
  
  ${() => !!RequestLogState.query ? 'background: none;' : ''}
`;

const rowColor = ({ status, mock }) => {
  if (mock) {
    return '#4b82d5';
  }

  if (status >= 400 && status < 600) {
    return '#d54900'
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

const HeaderRow = styled.div`
  background-color: white;
  border-bottom: ${(props) => props.theme.darkBorder};
  height: 24px;
  width: 100%;
  display: flex;
`;

const MockButton = styled(BlueButton)`
  color: #fff !important;
`;

class RequestLog extends React.Component {

  state = {
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

  controls = () => (
    <div style={{ display: 'flex' }}>
      <SearchInput query={ RequestLogState.query }
                   onBlur={ this.hideFilters }
                   onFocus={ this.showFilters }
                   onChange={ this.onQueryChange }
                   onClearQuery={ this.clearQuery }/>
      <IconDropdown
        icon="filter"
        value={ RequestLogState.filter }
        position="right"
        align="left"
        anchorPoint="bottom"
        onChange={ RequestLogState.updateFilter }
        options={ [
          { label: 'All', value: 'All' },
          { label: 'Mocked', value: 'Mocked' },
          { label: 'Unmocked', value: 'Unmocked' },
          { label: 'Successful', value: 'Successful' },
          { label: 'Errorneus', value: 'Failing' }
        ]}
      />
    </div>

  );

  renderDate(timestamp) {
    if (!timestamp) {
      return;
    }

    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

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
            API.capturedRequests
              .filter((request) => request.url.includes(RequestLogState.query))
              .filter(filterLogByType)
              .map((request) => {
                const { params, mock, startTime, response: { status, delay, body } } = request;
                const selected = this.state.selectedRequestId === request.id;

                return (
                  <RequestRow key={ request.id }
                              onClick={ this.selectRequest(request) }
                              onDoubleClick={ this.editRequest(request) }
                              status={ status }
                              selected={ selected }
                              mock={ mock }>
                    <Cell cell="time" status={ status }>{ this.renderDate(startTime) }</Cell>
                    <Cell cell="url">
                      <URLStamp request={ request } highlight={ RequestLogState.query }/>
                    </Cell>
                    <Cell cell="params" status={ status }>{ params }</Cell>
                    <Cell cell="status" status={ status }>{ status }</Cell>
                    <Cell cell="delay" status={ status }>{ convertDelayToSeconds(delay) }</Cell>
                    <Cell autosize status={ status }>{ body }</Cell>
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
