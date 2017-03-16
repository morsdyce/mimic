import React from 'react';
import styled from 'styled-components';
import { Div, Span } from 'ui/components/common/base';

export const TabsContainer = styled(Div)`
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

export const Tab = styled(Div)`
  padding: 2px ${(props) => props.isSelected ? '6px' : '8px'};
  ${(props) => props.isSelected ? 'padding-top: 1px;' : ''}
  text-transform: capitalize;
  border-radius: 4px 4px 0 0;
  margin-bottom: -1px;
  align-items: flex-end;
  user-select: none;
  font-weight: ${(props) => props.isSelected ? 'bold' : 'normal'};
  color: ${(props) => props.isSelected ? 'black' : props.theme.blue};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  border: ${(props) => props.isSelected ? props.theme.lightBorder : 'none'};
  border-bottom: ${(props) => props.isSelected ? '1px solid white' : 'none'};
  
  &:first-child {
    padding-right: ${(props) => props.isSelected ? '5px' : '6px'};
    border-top-left-radius: 0;
    border-left: none;
  }
`;

export const TabsText = styled(Span)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b5b5b5;
  padding-right: 10px;
`;

export const MultiSelectContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const MultiSelectContainerText = styled(Span)`
  color: #858585;
`;

export const MocksContainer = styled(Div)`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const MocksMainPanel = styled(Div)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const GroupViewContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const GroupViewContainerText = styled(Span)`
  color: #858585;
`;

export const GroupViewTextContainer = styled(Div)`
  margin-top: 40px;
`;
