import React from 'react';
import styled from 'styled-components';
import every from 'lodash/every';
import API from 'api';
import UIState from 'ui/states/UIState';
import MocksState from 'ui/states/MocksState';
import RequestLogState from 'ui/states/RequestLogState';
import { convertDelayToSeconds } from 'ui/utils/string';
import BlueButton from 'ui/components/common/BlueButton';
import Cell from 'ui/components/RequestLogs/Cell';
import URLStamp from 'ui/components/common/URLStamp';

const rowColor = (status, mock) => {
  if (mock) {
    return '#4b82d5';
  }

  if (status >= 400 && status < 600) {
    return '#d54900'
  }

  return 'black';
};

const Container = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  cursor: pointer;
  color: ${(props) => rowColor(props.status, props.mock)};
  background-color: ${(props) => props.selected ? '#d9e5f6' : 'transparent'};
`;

const renderDate = (timestamp) => {
  if (!timestamp) {
    return;
  }

  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const editRequest = (request) => (event) => {
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

const RequestRow = ({ request, onSelect, selected }) => (
  <Container onClick={ onSelect(request) }
             onDoubleClick={ editRequest(request) }
             status={ request.response.status }
             mock={ request.mock }
             selected={ selected }>

    <Cell cell="time">
      { renderDate(request.startTime) }
    </Cell>

    <Cell cell="url">
      <URLStamp request={ request } highlight={ RequestLogState.query }/>
    </Cell>

    <Cell cell="params">
      { request.params }
    </Cell>

    <Cell cell="status">
      { request.response.status }
    </Cell>

    <Cell cell="delay">
      { convertDelayToSeconds(request.response.delay) }
    </Cell>

    <Cell>
      { request.response.body }
    </Cell>

    {
      selected && (
        <BlueButton onClick={ editRequest(request) }>
          { request.mockId ? 'Edit...' : 'Mock...' }
        </BlueButton>
      )
    }
  </Container>
);

export default RequestRow;