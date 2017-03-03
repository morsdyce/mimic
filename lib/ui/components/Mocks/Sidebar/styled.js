import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';

export const ContextMenuWrapper = styled.div`
  position: fixed;
  background-color: white;
  border: ${(props) => props.theme.lightBorder};
  user-select: none;
  width: 240px;
  z-index: 2147483647;
`;

export const ContextMenuItem = styled.div`
  padding: 3px 6px 3px 32px;
  opacity: ${(props) => props.disabled ? '0.3' : '1'};

  &:hover {
    background-color: ${(props) => props.disabled ? 'inherit' : props.theme.selectionBlue};
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  }
`;

export const ContextMenuSeparator = styled.div`
  margin-bottom: 10px;
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  user-select: none;
  ${(props) => props.isSelected ? 'background-color:' + props.theme.selectionBlue + ';': ''}
  ${(props) => props.isHovered ? 'background-color:' + props.theme.lightGray + ';': ''}
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: ${(props) => props.selectionBlue};
  }
`;

export const GroupMocksCount = styled.div`
  display: inline-block;
  vertical-align: top;
  user-select: none;
  margin-left: 3px;
  font-size: 10px;
`;

export const InlineEditContainer = styled.div`
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


export const MockContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  ${(props) => props.isSelected ? 'background-color:' + props.theme.selectionBlue + ';' : ''};
  padding-left: ${(props) => props.nested ? '25px' : '4px'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
`;

export const MockURL = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MockStatus = styled.div`
  width: 28px;
  color: ${(props) => props.children > 400 ? props.theme.red : 'black'};
  margin-left: 5px;
`;

export const SidebarContainer = styled.div`
  position: relative;
  border-right: ${(props) => props.theme.lightBorder};
  overflow-y: auto;
  height: 100%;
  ${(props) => props.isHovered ? 'background-color: #f0f0f0;' : ''}
`;

export const ActionsContainer = styled.div`
  display: flex;
`;

export const ActionGroup = styled.div`
  padding: 5px;
  ${(props) => props.margin ? `margin-right: ${props.margin};` : ''}
  ${(props) => props.autosize ? 'flex-grow: 1;' : ''}
`;

export const Action = styled(Icon)`
  margin: 0 0 0 10px;
  
  &:first-child {
    margin: 0;
  }
`;
