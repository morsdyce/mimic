import React from 'react';
import styled from 'styled-components';
import { Div, Span } from 'ui/components/common/base';

export const ContextMenuWrapper = styled(Div)`
  position: fixed;
  background-color: white;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.33);
  user-select: none;
  width: 240px;
  z-index: 2147483647;
`;

export const ContextMenuItem = styled(Div)`
  padding: 3px 6px 3px 32px;
  opacity: ${(props) => props.disabled ? '0.3' : '1'};

  &:hover {
    background-color: ${(props) => props.disabled ? 'inherit' : props.theme.selectionBlue};
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  }
`;

export const ContextMenuSeparator = styled(Div)`
  margin-bottom: 10px;
`;

export const GroupHeader = styled(Div)`
  display: flex;
  align-items: center;
  padding: 4px;
  user-select: none;
  ${(props) => props.isSelected ? 'background-color:' + props.theme.selectionBlue + ';': ''}
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
`;

export const GroupMocksCount = styled(Div)`
  display: inline-block;
  vertical-align: top;
  user-select: none;
  margin-left: 3px;
  font-size: 10px;
`;

export const InlineEditContainer = styled(Div)`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InlineEditInput = styled.input`
  display: block;
  width: 100%;
  background-color: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  border: none;
  padding: 0;
`;


export const MockContainer = styled(Div)`
  display: flex;
  align-items: baseline;
  padding: 4px;
  ${(props) => props.isSelected ? 'background-color:' + props.theme.selectionBlue + ';' : ''};
  padding-left: ${(props) => props.nested ? '25px' : '4px'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
`;

export const MockURL = styled(Div)`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MockStatus = styled(Div)`
  width: 28px;
  color: ${(props) => props.children > 400 ? props.theme.red : 'black'};
  margin-left: 5px;
`;

export const SidebarContainer = styled(Div)`
  position: relative;
  overflow-y: auto;
  height: 100%;
`;

export const ActionsContainer = styled(Div)`
  display: flex;
  height: 25px;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

export const ActionGroup = styled(Div)`
  display: flex;
  align-items: center;
  margin-right: ${(props) => props.marginRight ? `${props.marginRight}px` : '15px'};
  ${(props) => props.margin ? `margin-right: ${props.margin};` : ''}
  ${(props) => props.autosize ? 'flex-grow: 1;' : ''}

  &:last-child {
    margin-right: 5px;
  }
`;

export const Action = styled(Span)`
  margin: 0 0 0 ${(props) => props.margin ? `${props.margin}px` : '10px'};
  display: flex;
  align-items: center;
  
  &:first-child {
    margin: 0;
  }
`;
