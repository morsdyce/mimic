import React from 'react';
import styled from 'styled-components';

const BlueButton = styled.div`
  color: white;
  background-color: ${(props) => props.theme.blue};
  display: inline-block;
  padding: ${(props) => props.smaller ? '0' : '2px'} 8px;
  margin-right: ${(props) => props.smaller ? '4px' : '8px'};
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    background-color: #1462b8;
  }
`;

export default BlueButton;