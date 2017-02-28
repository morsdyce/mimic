import React from 'react';
import styled  from 'styled-components';
import edit from 'ui/icons/edit@2x.png';
import spin from 'ui/icons/spin.svg';
import mocked from 'ui/icons/mocked@2x.png';
import unmocked from 'ui/icons/unmocked@2x.png';
import remove from 'ui/icons/delete@2x.png';
import record from 'ui/icons/rec@2x.png';
import search from 'ui/icons/loupe@2x.png';
import delay from 'ui/icons/stopwatch@2x.png';
import select from 'ui/icons/up-down@2x.png';
import add from 'ui/icons/plus@2x.png';
import clear from 'ui/icons/clear@2x.png';
import expand from 'ui/icons/right@2x.png';
import close from 'ui/icons/close@2x.png';
import settings from '!!raw-loader!ui/icons/settings.svg';
import halfScreen from 'ui/icons/half-screen.svg';
import fullScreen from 'ui/icons/full-screen.svg';
import pro from 'ui/icons/pro@2x.png';
import help from 'ui/icons/help@2x.png';

const StyledIcon = styled.img`
  display: inline-block;
  height: 16px;
  user-select: none;
`;

const StyledDiv = styled.div`
  display: inline-block;
  height: 16px;
  user-select: none;
  line-height: 2.4;
`;

const ICONS = {
  edit, spin, mocked, unmocked, remove, record, search, delay, select,
  add, clear, expand, close, settings, halfScreen, fullScreen, pro, help
};

const Icon = ({ src, style, onClick }) => {
  if (['settings'].indexOf(src) !== -1) {
    return (
      <StyledDiv style={ style } dangerouslySetInnerHTML={{ __html: ICONS[src] }}/>
    );
  } else {
    return (
      <StyledIcon src={ ICONS[src] } style={ style } onClick={ onClick }/>
    );
  }
};

export default Icon;