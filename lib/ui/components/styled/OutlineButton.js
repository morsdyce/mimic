import React from 'react';
import styled from 'styled-components';

const OutlineButton = styled.button`
  border: 1px solid #a2bfe8;
  border-radius: 5px;
  background: transparent;
  padding: 4px 8px;
  margin: 0 6px;
  outline: none;
  cursor: pointer;
  color: #4882d3;
  font-size: 13px;
  line-height: 20px;
  
  &:hover {
    cursor: pointer;
    background-color: #4882d3;
    border-color: #4882d3;
    color: white;
  }
`;

export default OutlineButton;
