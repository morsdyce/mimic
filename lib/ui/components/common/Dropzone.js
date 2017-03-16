import React from 'react';
import styled from 'styled-components';
import { Div } from 'ui/components/common/base';

const Dropzone = styled(Div)`
  position: absolute;
  border: 2px solid ${(props) => props.theme.blue};
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${(props) => props.overlay ? '3px' : '0'};
  bottom: ${(props) => props.overlay ? '24px' : '0'};
  left: 0;
  right: 0;
  z-index: 2147483646;
  pointer-events: none;
  ${(props) => props.overlay ? 'background: rgba(255, 255, 255, 0.92);' : ''}
`;

export default Dropzone;
