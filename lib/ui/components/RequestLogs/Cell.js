import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  display: flex;
  align-items: center;
`;

const Cell = ({ children, cell, width }) => (
  <Container style={ cell ? { width } : { flex: '1' } }>
    { children }
  </Container>
);

export default Cell;