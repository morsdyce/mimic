import React from 'react';
import styled from 'styled-components';
import RequestLogState from 'ui/states/RequestLogState';

const statusColors = ({ status }) => status >= 400 && status < 600 ? 'color: #D54900' : '';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  user-select: none;
  display: flex;
  height: 24px;
  line-height: 24px;
  ${ statusColors };
  
  &:last-child {
    border-right: none;
  }
`;

const Cell = ({ children, cell, status, autosize }) => {
  if (autosize) {
    return (
      <Container style={{ flex: '1' }} status={ status }>
        { children }
      </Container>
    );
  }

  return (
    <Container style={{ width: RequestLogState.columns[cell] }} status={ status }>
      { children }
    </Container>
  );
};

export default Cell;