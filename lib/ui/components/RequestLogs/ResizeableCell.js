import React from 'react';
import styled from 'styled-components';
import RequestLogState from 'ui/states/RequestLogState';
import ResizeHandle from 'ui/components/common/ResizeHandle';

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

const ResizeableCell = ({ children, cell, status, autosize }) => {
  if (autosize) {
    return (
      <Cell style={{ flex: '1' }} status={ status }>
        { children }
      </Cell>
    );
  }

  return (
    <Cell style={{ width: RequestLogState.columns[cell] }} status={ status }>
      <ResizeHandle value={ `logColumns.${cell}` }/>
      { children }
    </Cell>
  );
};

export default ResizeableCell;