import React from 'react';
import styled from 'styled-components';
import UIState, { UIStateListener } from 'ui/UIState';

const statusColors = ({ status }) => status >= 400 && status < 600 ? 'color: #D54900' : '';

const Cell = styled.div`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 6px;
  border-right: 1px solid #b3b3b3;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  ${ statusColors };
  
  &:last-child {
    border-right: none;
  }
`;

const ResizeableCell = ({ children, cell, status, autosize, innerHTML }) => {
  if (autosize) {
    return (
      <Cell style={{ flex: '1' }} status={ status }>
        { children }
      </Cell>
    );
  }

  if (innerHTML) {
    return (
      <Cell style={{ width: UIState.logColumns[cell] }}
            dangerouslySetInnerHTML={{ __html: innerHTML }}
            status={ status }/>
    );
  }

  return (
    <Cell style={{ width: UIState.logColumns[cell] }} status={ status }>
      { children }
    </Cell>
  );
};

export default UIStateListener(ResizeableCell);