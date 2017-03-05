import React from 'react';
import styled  from 'styled-components';
import remove from '!!raw-loader!ui/icons/trash.svg';
import record from '!!raw-loader!ui/icons/rec.svg';
import search from '!!raw-loader!ui/icons/loupe.svg';
import add from '!!raw-loader!ui/icons/new.svg';
import clear from '!!raw-loader!ui/icons/clear.svg';
import expand from '!!raw-loader!ui/icons/expanded.svg';
import close from '!!raw-loader!ui/icons/close.svg';
import halfScreen from '!!raw-loader!ui/icons/half-size.svg';
import fullScreen from '!!raw-loader!ui/icons/full-size.svg';
import collapseAll from '!!raw-loader!ui/icons/collapse-all.svg';
import expandAll from '!!raw-loader!ui/icons/expand-all.svg';
import help from '!!raw-loader!ui/icons/help.svg';
import undo from '!!raw-loader!ui/icons/undo.svg';
import settings from '!!raw-loader!ui/icons/settings.svg';

const Icon = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 16px;
  height: 16px;
  line-height: 16px;
  user-select: none;
  fill: ${(props) => props.active ? 'white' : 'black'};
  
  &:hover {
    fill: ${(props) => props.active ? 'white' : props.theme.blue};
  }
`;

const ICONS = {
  remove, record, search, add, clear, expand, close, help, settings,
  halfScreen, fullScreen, collapseAll, expandAll, undo
};

const ActionIcon = ({ action, active, onClick }) => (
  <Icon action={ action }
        active={ active }
        dangerouslySetInnerHTML={{ __html: ICONS[action] }}
        onClick={ onClick }/>
);

export default ActionIcon;
