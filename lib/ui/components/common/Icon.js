import React from 'react';
import styled  from 'styled-components';
import edit from '!!raw-loader!ui/icons/pencil.svg';
import spin from '!!raw-loader!ui/icons/spin.svg';
import mocked from '!!raw-loader!ui/icons/mocked.svg';
import unmocked from '!!raw-loader!ui/icons/unmocked.svg';
import recording from '!!raw-loader!ui/icons/recording.svg';
import delay from '!!raw-loader!ui/icons/stopwatch.svg';
import select from '!!raw-loader!ui/icons/select.svg';
import filter from '!!raw-loader!ui/icons/funnel.svg';
import check from '!!raw-loader!ui/icons/tick.svg';
import add from '!!raw-loader!ui/icons/new.svg';

const StyledIcon = styled.div`
  display: inline-block;
  height: ${(props) => props.src === 'mocked' || props.src === 'unmocked' ? '22px' : '16px'};
  width: ${(props) => props.src === 'mocked' || props.src === 'unmocked' ? '22px' : '16px'};
  user-select: none;
  line-height: ${(props) => props.src === 'mocked' || props.src === 'unmocked' ? '22px' : '16px'};
`;

const ICONS = { edit, spin, mocked, unmocked, recording, delay, filter, select, check, add };

const Icon = ({ src, style, onClick, className }) => (
  <StyledIcon style={ style }
              src={ src }
              dangerouslySetInnerHTML={{ __html: ICONS[src] }}
              className={ className }
              onClick={ onClick }/>
);

export default Icon;
