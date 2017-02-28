import React from 'react';
import styled from 'styled-components';
import UIState, { UIStateListener } from 'ui/UIState';
import ResizeHandle from 'ui/components/ResizeHandle';
import MethodLabel from 'ui/components/styled/MethodLabel';

const statusColors = ({ status }) => status >= 400 && status < 600 ? 'color: #D54900' : '';

const Cell = styled.div`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  user-select: none;
  border-right: ${(props) => props.theme.darkBorder};
  display: flex;
  height: 24px;
  line-height: 24px;
  ${ statusColors };
  
  &:last-child {
    border-right: none;
  }
`;

const innerHTMLStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const ResizeableCell = ({ children, cell, status, autosize, method, innerHTML }) => {
  if (autosize) {
    return (
      <Cell style={{ flex: '1' }} status={ status }>
        { children }
      </Cell>
    );
  }

  if (innerHTML) {
    return (
      <Cell style={{ width: UIState.logColumns[cell] }} status={ status }>
        <MethodLabel>{ method }</MethodLabel>
        <div style={ innerHTMLStyle } dangerouslySetInnerHTML={{ __html: innerHTML }}/>
        <ResizeHandle value={ `logColumns.${cell}` }/>
      </Cell>
    );
  }

  return (
    <Cell style={{ width: UIState.logColumns[cell] }} status={ status }>
      <ResizeHandle value={ `logColumns.${cell}` }/>
      { children }
    </Cell>
  );
};

export default UIStateListener(ResizeableCell);