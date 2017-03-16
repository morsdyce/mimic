import React from 'react';
import styled from 'styled-components';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  display: flex;
  position: relative;
  overflow: initial;
  padding: 0 6px;
  user-select: none;
  height: 25px;
  line-height: 25px;
`;

const HeaderCell = ({ children, cell, width, autosize }) => {
  if (autosize) {
    return (
      <Container style={{ flex: '1' }}>
        { children }
      </Container>
    );
  }

  return (
    <Container style={{ width }}>
      <ResizeHandle value={ `logColumns.${cell}` }/>
      { children }
    </Container>
  );
};

export default HeaderCell;