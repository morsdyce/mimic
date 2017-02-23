import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  font-size: 10px;
  font-weight: 600;
  min-width: 32px;
  width: 32px;
`;

const MethodLabel = ({ children }) => <Label>{ children === 'DELETE' ? 'DEL' : children }</Label>;

export default MethodLabel;