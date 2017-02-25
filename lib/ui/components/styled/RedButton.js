import React from 'react';
import styled from 'styled-components';

const RedButton = styled.div`
  color: white;
  background-color: ${(props) => props.disabled ? '#dadada' : '#ba3a00'};
  display: inline-block;
  padding: 2px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
  user-select: none;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  
  &:hover {
    background-color: ${(props) => props.disabled ? '#dadada' : '#a12100'};
  }
`;

export default RedButton;
