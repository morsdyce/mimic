import React from 'react';
import styled  from 'styled-components';
import edit from '!!raw-loader!ui/icons/pencil.svg';
import spin from '!!raw-loader!ui/icons/spin.svg';
import mocked from '!!raw-loader!ui/icons/mocked.svg';
import unmocked from '!!raw-loader!ui/icons/unmocked.svg';
import remove from '!!raw-loader!ui/icons/trash.svg';
import record from '!!raw-loader!ui/icons/rec.svg';
import search from '!!raw-loader!ui/icons/loupe.svg';
import delay from '!!raw-loader!ui/icons/time.svg';
import select from 'ui/icons/up-down@2x.png';
import add from '!!raw-loader!ui/icons/new.svg';
import clear from 'ui/icons/clear@2x.png';
import expand from '!!raw-loader!ui/icons/expanded.svg';
import close from '!!raw-loader!ui/icons/close.svg';
import settings from '!!raw-loader!ui/icons/settings.svg';
import halfScreen from '!!raw-loader!ui/icons/half-size.svg';
import fullScreen from '!!raw-loader!ui/icons/full-size.svg';
import pro from 'ui/icons/pro@2x.png';
import help from '!!raw-loader!ui/icons/help.svg';
import collapseAll from '!!raw-loader!ui/icons/collapse-all.svg';
import expandAll from '!!raw-loader!ui/icons/expand-all.svg';
import filter from 'ui/icons/filter.png';
import undo from '!!raw-loader!ui/icons/undo.svg';

const StyledIcon = styled.img`
  display: inline-block;
  height: 16px;
  user-select: none;
`;

const StyledDiv = styled.div`
  display: inline-block;
  height: 16px;
  width: 16px;
  user-select: none;
  line-height: 16px;
`;

const ICONS = {
  edit, spin, mocked, unmocked, remove, record, search, delay, select,
  add, clear, expand, close, settings, halfScreen, fullScreen, pro, help,
  collapseAll, expandAll, filter, undo
};

const Icon = ({ src, style, onClick, className }) => {
  if (['select', 'clear', 'pro', 'filter'].indexOf(src) !== -1) {
    return (
      <StyledIcon src={ ICONS[src] } style={ style } onClick={ onClick } className={ className }/>
    );
  } else {
    return (
      <StyledDiv style={ style }
                 dangerouslySetInnerHTML={{ __html: ICONS[src] }}
                 className={ className }
                 onClick={ onClick }/>
    );
  }
};

export default Icon;
