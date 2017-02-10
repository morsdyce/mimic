import React   from 'react';
import styled from 'styled-components';
import mimicLogo from 'ui/assets/images/mimic.svg';

const Toggle = styled.div`
  cursor: 'pointer',
  position: 'fixed',
  bottom: '5px',
  right: '5px',
  z-index: '2147483647',
  background-color: '#f7f7f7',
  padding: '4px 8px',
  border-radius: '5px'
`;

const Icon = styled.img`
  width: '34px'
`;

class UIToggle extends React.Component {

  render() {
    return (
      <Toggle>
        <Icon src={ mimicLogo } alt="Toggle Mimic"/>
      </Toggle>
    );
  }
}

export default UIToggle;
