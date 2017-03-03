import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  font-size: 10px;
  font-weight: 600;
  min-width: 32px;
  width: 32px;
  user-select: none;
  text-transform: uppercase;
  ${(props) => props.failed ? 'color: ' + props.theme.red + ';' : ''}
  ${(props) => props.mocked ? 'color: ' + props.theme.mockedBlue + ';' : ''}
`;

const MethodLabel = ({ children, mocked, failed }) => (
  <Label mocked={ mocked } failed={ failed }>
    { children === 'DELETE' ? 'DEL.' : children }
  </Label>
);

export default MethodLabel;