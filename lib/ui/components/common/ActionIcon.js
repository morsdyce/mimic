import React from 'react';
import styled  from 'styled-components';
import { Div } from 'ui/components/common/base';
import remove from '!!raw-loader!ui/icons/trash.svg';
import record from '!!raw-loader!ui/icons/rec.svg';
import recording from '!!raw-loader!ui/icons/recording.svg';
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

const fill = (props) => {
  if (props.disabled) {
    return props.theme.darkGray;
  }

  if (props.active) {
    return 'white';
  }

  return 'black';
};

const hoverFill = (props) => {
  if (props.disabled) {
    return props.theme.darkGray;
  }

  if (props.active) {
    return 'white';
  }

  return props.theme.blue;
};

const Icon = styled(Div)`
  display: inline-block;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  width: 16px;
  height: 16px;
  line-height: 16px;
  user-select: none;
  fill: ${(props) => fill(props)};
  
  &:hover {
    fill: ${(props) => hoverFill(props)};
  }
`;

const ICONS = {
  remove, record, recording, search, add, clear, expand, close, help, settings,
  halfScreen, fullScreen, collapseAll, expandAll, undo
};

const ActionIcon = ({ action, active, disabled, onClick, style }) => (
  <Icon action={ action }
        active={ active }
        style={ style }
        disabled={ disabled }
        dangerouslySetInnerHTML={{ __html: ICONS[action] }}
        onClick={ onClick }/>
);

export default ActionIcon;
