import React from 'react';
import styled from 'styled-components';
import RequestLogState from 'ui/states/RequestLogState';
import ResizeHandle from 'ui/components/common/ResizeHandle';

const Container = styled.div`
  position: relative;
  overflow: initial;
  padding: 0 6px;
  user-select: none;
  height: 24px;
  line-height: 24px;
`;

const HeaderCell = ({ children, cell, autosize }) => {
  if (autosize) {
    return (
      <Container style={{ flex: '1' }}>
        { children }
      </Container>
    );
  }

  return (
    <Container style={{ width: RequestLogState.columns[cell] }}>
      <ResizeHandle value={ `logColumns.${cell}` }/>
      { children }
    </Container>
  );
};

export default HeaderCell;