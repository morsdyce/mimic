import React from 'react';
import styled from 'styled-components';
import RequestLogState from 'ui/states/RequestLogState';

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  height: 24px;
  line-height: 24px;
`;

const Cell = ({ children, cell }) => {
  const style = cell
    ? { width: RequestLogState.columns[cell] }
    : { flex: '1' };

  return (
    <Container style={ style }>
      { children }
    </Container>
  );
};

export default Cell;