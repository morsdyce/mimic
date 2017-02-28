import React from 'react';
import styled  from 'styled-components';
import edit from 'ui/assets/images/edit@2x.png';
import spin from 'ui/assets/images/spin.svg';
import mocked from 'ui/assets/images/mocked@2x.png';
import unmocked from 'ui/assets/images/unmocked@2x.png';
import remove from 'ui/assets/images/delete@2x.png';
import record from 'ui/assets/images/rec@2x.png';
import search from 'ui/assets/images/loupe@2x.png';
import delay from 'ui/assets/images/stopwatch@2x.png';
import select from 'ui/assets/images/up-down@2x.png';
import add from 'ui/assets/images/plus@2x.png';
import clear from 'ui/assets/images/clear@2x.png';
import expand from 'ui/assets/images/right@2x.png';
import close from 'ui/assets/images/close@2x.png';
import settings from '!!raw-loader!ui/assets/images/settings.svg';
import halfScreen from 'ui/assets/images/half-screen.svg';
import fullScreen from 'ui/assets/images/full-screen.svg';
import pro from 'ui/assets/images/pro@2x.png';
import help from 'ui/assets/images/help@2x.png';

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