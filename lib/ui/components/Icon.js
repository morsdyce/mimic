import React from 'react';
import styled  from 'styled-components';
import edit from 'ui/assets/images/edit@2x.png';
import spin from 'ui/assets/images/spin.svg';
import mocked from 'ui/assets/images/mocked@2x.png';
import unmocked from 'ui/assets/images/unmocked@2x.png';

const StyledIcon = styled.img`
  display: inline-block;
  height: 16px;
  user-select: none;
`;

const ICONS = { edit, spin, mocked, unmocked };

const Icon = ({ src, style }) => (
  <StyledIcon src={ ICONS[src] } style={ style }/>
);

export default Icon;