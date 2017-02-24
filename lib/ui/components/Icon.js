import React from 'react';
import styled  from 'styled-components';
import editIcon from 'ui/assets/images/edit@2x.png';
import spinIcon from 'ui/assets/images/spin.svg';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import deleteIcon from 'ui/assets/images/delete@2x.png';
import recordIcon from 'ui/assets/images/rec@2x.png';
import searchIcon from 'ui/assets/images/loupe@2x.png';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';
import selectIcon from 'ui/assets/images/up-down@2x.png';
import addIcon from 'ui/assets/images/plus@2x.png';
import clearIcon from 'ui/assets/images/clear@2x.png';
import expandIcon from 'ui/assets/images/right@2x.png';
import closeIcon from 'ui/assets/images/close@2x.png';
import settingsIcon from 'ui/assets/images/settings.svg';
import halfScreenIcon from 'ui/assets/images/half-screen.svg';
import fullScreenIcon from 'ui/assets/images/full-screen.svg';
import proIcon from 'ui/assets/images/pro@2x.png';
import helpIcon from 'ui/assets/images/help@2x.png';

const StyledIcon = styled.img`
  display: inline-block;
  height: 16px;
  user-select: none;
`;

const ICONS = {
  edit: {
    icon: editIcon,
    alt: "Edit"
  },
  spin: {
    icon: spinIcon,
    alt: "Pending..."
  },
  mocked: {
    icon: mockedIcon,
    alt: "Mocked Request"
  },
  unmocked: {
    icon: unmockedIcon,
    alt: "Unmocked Request"
  },
  delete: {
    icon: deleteIcon,
    alt: "Delete"
  },
  record: {
    icon: recordIcon,
    alt: "Record"
  },
  search: {
    icon: searchIcon,
    alt: "Search"
  },
  delay: {
    icon: stopwatchIcon,
    alt: "Delay"
  },
  select: {
    icon: selectIcon,
    alt: "Select"
  },
  add: {
    icon: addIcon,
    alt: "Add"
  },
  clear: {
    icon: clearIcon,
    alt: "Add"
  },
  expand: {
    icon: expandIcon,
    alt: "Expand"
  },
  close: {
    icon: closeIcon,
    alt: "Close"
  },
  settings: {
    icon: settingsIcon,
    alt: "Settings"
  },
  halfScreen: {
    icon: halfScreenIcon,
    alt: "Half Screen"
  },
  fullScreen: {
    icon: fullScreenIcon,
    alt: "Full Screen"
  },
  pro: {
    icon: proIcon,
    alt: "Pro"
  },
  help: {
    icon: helpIcon,
    alt: "About"
  }
};

const Icon = ({ src, style, onClick }) => (
  <StyledIcon src={ ICONS[src].icon } alt={ ICONS[src].alt } style={ style } onClick={ onClick }/>
);

export default Icon;