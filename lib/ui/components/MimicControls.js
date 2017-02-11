import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  font-size: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  ${(props) => props.fullWidth ? 'width: 100%;' : '' }
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 0 8px;
  height: 25px;
  border-right: 1px solid #d8d8d8;
  border-top: 1px solid #d8d8d8;
  cursor: pointer;
  ${(props) => props.rounded ? 'border-radius: 0 0 0 11px;' : ''}
  
  &:hover {
    background-color: #c8dcf4;
  }
`;

export const MimicControls = ({ showLogs,  showMocks, fullWidth, children }) => (
  <Container fullWidth={ fullWidth }>
    <Control rounded onClick={ showLogs }>
      Logs
    </Control>
    <Control onClick={ showMocks }>
      Mocks
    </Control>
    { children }
  </Container>
);

export default MimicControls;
