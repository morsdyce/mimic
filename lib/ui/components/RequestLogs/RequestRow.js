import React from 'react';
import styled from 'styled-components';
import find from 'lodash/find';
import isString from 'lodash/isString';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import API from 'api';
import UIState from 'ui/states/UIState';
import MocksState from 'ui/states/MocksState';
import { convertDelayToSeconds } from 'ui/utils/string';
import Icon from 'ui/components/common/Icon';
import { RequestOptionSpacer } from 'ui/components/QuickEdit/styled';
import BlueButton from 'ui/components/common/BlueButton';
import Cell from 'ui/components/RequestLogs/Cell';
import URLStamp from 'ui/components/common/URLStamp';
import { Div } from 'ui/components/common/base';

const rowColor = (request) => {
  if (request.mockStatus === 'active') {
    return '#4b82d5';
  }

  if (request.response.status >= 400 && request.response.status < 600) {
    return '#d54900'
  }

  return 'black';
};

const Container = styled(Div)`
  height: 25px;
  width: 100%;
  display: flex;
  cursor: pointer;
  color: ${(props) => rowColor(props.request)};

  &:nth-child(even) {
    background-color: #f0f0f0;
  }

  &:nth-child(odd) {
    background-color: white;
  }

  ${(props) => props.selected ? 'background-color: #d9e5f6 !important;' : ''}
`;

const pad0 = (num) => ('0' + num).slice(-2);

const renderDate = (timestamp) => {
  if (!timestamp) {
    return;
  }

  const date = new Date(timestamp);
  return `${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`;
};

const editRequest = (request) => (event) => {
  if (event.nativeEvent.srcElement.dataset.resizeHandle) {
    return;
  }

  const matchingMocks = API.getMatchingMocks(request);
  const activeMock = find(matchingMocks, { isActive: true });
  const disabledMock = find(matchingMocks, { isActive: false });

  const mock = activeMock || disabledMock || API.mockRequest(request);

  MocksState.selectItems([mock]);

  if (mock.groupId) {
    MocksState.expandGroup(mock.groupId);
  }

  UIState.setViewMode('mocks');
};

const isNullOrUndefined = (value) => isNull(value) || isUndefined(value);

const RequestRow = ({ request, onSelect, selected, getCellWidth, query }) => {
  const body = get(request, 'mock.response.body', request.response.body);

  return (
    <Container onClick={onSelect(request)}
               onDoubleClick={editRequest(request)}
               request={request}
               selected={selected}>

      <Cell width={getCellWidth('time')} cell="time">
        {
          request.mockStatus === 'active' &&
          <Icon src="mocked" style={{ marginRight: 5, fill: '#4b82d5' }}/>
        }

        {
          request.mockStatus === 'inactive' &&
          <Icon src="unmocked" style={{ marginRight: 5, fill: '#b0b0b0' }}/>
        }

        {!request.mockStatus && <RequestOptionSpacer/>}

        {renderDate(request.startTime)}
      </Cell>

      <Cell width={getCellWidth('url')} cell="url">
        <URLStamp request={request} highlight={query}/>
      </Cell>

      <Cell width={getCellWidth('params')} cell="params">
        { !isString(request.params) && !isNullOrUndefined(request.params) ? 'binary data' : request.params }
      </Cell>

      <Cell width={getCellWidth('status')} cell="status">
        {request.response.status}
      </Cell>

      <Cell width={getCellWidth('delay')} cell="delay">
        {request.response.delay ? convertDelayToSeconds(request.response.delay) : '...'}
      </Cell>

      <Cell>
        { !isString(body) && !isNullOrUndefined(body) ? 'binary data' : body  }
      </Cell>

      {
        selected && (
          <BlueButton onClick={editRequest(request)}>
            {request.mockId ? 'Edit...' : 'Mock...'}
          </BlueButton>
        )
      }
    </Container>
  );
};

export default RequestRow;
