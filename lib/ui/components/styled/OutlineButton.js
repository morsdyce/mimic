import React from 'react';
import styled from 'styled-components';

const OutlineButton = styled.button`
  border: 1px solid #a2bfe8;
  border-radius: 5px;
  background: transparent;
  padding: 2px 8px;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  color: #4882d3;
  user-select: none;
  
  &:hover {
    cursor: pointer;
    background-color: #4882d3;
    border-color: #4882d3;
    color: white;
  }
`;

export default OutlineButton;
