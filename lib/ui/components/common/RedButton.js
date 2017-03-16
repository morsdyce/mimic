import React from 'react';
import styled from 'styled-components';
import { Div } from 'ui/components/common/base';

const RedButton = styled(Div)`
  color: white;
  background-color: ${(props) => props.disabled ? '#dadada' : props.theme.red};
  display: inline-block;
  padding: 2px 8px;
  margin-right: 8px;
  border-radius: 4px;
  user-select: none;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  
  &:hover {
    background-color: ${(props) => props.disabled ? '#dadada' : '#a12100'};
  }
`;

export default RedButton;
