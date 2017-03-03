import React from 'react';
import styled from 'styled-components';

export const QuickEditResponseEditor = styled.input`
  border: none;
  width: 100%;
  height: 24px;
  padding: 0 6px;
  outline: 0;
  line-height: 24px;
  font-size: 13px;
  
  &:focus {
     box-shadow: inset 0 0 0px 2px #b2caef;
  }
`;

export const QuickEditNotMockedMessage = styled.div`
  padding: 0 6px;
  line-height: 24px;
`;

export const QuickEditContainer = styled.div`
  display: flex;
  height: 24px;
  border-top: ${(props) => props.theme.lightBorder};
  width: calc(100% - 104px);
  margin-left: 104px;
`;

export const QuickEditSection = styled.div`
  display: flex;
  align-items: center;
  border-right: ${(props) => props.theme.lightBorder};
  height: 100%;
`;

export const QuickEditMockSection = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;
`;

export const QuickEditResponseBodySection = styled(QuickEditSection)`
  padding: 0;
  margin-right: 4px;
  flex: 1;
`;

export const RequestOptionContainer = styled.div`
  padding: 2px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    background-color: ${(props) => props.theme.selectionBlue};
  }
`;

export const RequestOptionSpacer = styled.span`
  width: 21px;
`;

export const RequestOptionStatus = styled.span`
  ${(props) => props.children >= 400 ? 'color:' + props.theme.red : ''};
  ${(props) => props.isMocked ? 'color:' + props.theme.blue : ''};
`;

export const RequestOptionValueContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 450px;
`;
