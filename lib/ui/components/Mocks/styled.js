import React from 'react';
import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => props.theme.lightBorder};
`;

export const Tab = styled.div`
  padding: 2px ${(props) => props.isSelected ? '6px' : '10px'};
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

export const TabsText = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b5b5b5;
  font-size: 14px;
  padding-right: 10px;
`;

export const MultiSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const MultiSelectContainerText = styled.span`
  color: #858585;
`;

export const MocksContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const MocksActions = styled.div`
  width: 234px;
  height: 23px;
  border-top: 0;
  display: flex;
  align-items: center;
  border-right: ${(props) => props.theme.lightBorder};
  padding-right: 3px;
`;

export const MocksMainPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MocksActionIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

export const MocksSearchInput = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  outline: none;
  padding-left: 5px;
`;

export const MocksFiltersContainer = styled.div`
  display: inline;
  padding: 0 8px;
  cursor: default;
  user-select: none;
`;

export const GroupViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const GroupViewContainerText = styled.span`
  color: #858585;
`;

export const GroupViewTextContainer = styled.div`
  margin-top: 40px;
`;