import React from 'react';
import styled from 'styled-components';
import { Div } from 'ui/components/common/base';

const OutlineButton = styled(Div)`
  border: 1px solid #a2bfe8;
  border-radius: 5px;
  background: transparent;
  padding: 2px 8px;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
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
