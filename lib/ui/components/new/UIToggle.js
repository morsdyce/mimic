import React   from 'react';
import mimicLogo from 'ui/assets/images/mimic.svg';

const toggleStyle = {
  cursor: 'pointer',
  position: 'fixed',
  bottom: '5px',
  right: '5px',
  zIndex: '2147483647',
  backgroundColor: '#f7f7f7',
  padding: '4px 8px',
  borderRadius: '5px'
};

const iconStyle = {
  width: '34px'
};

class UIToggle extends React.Component {

  render() {
    return (
      <div style={ toggleStyle }>
        <img src={ mimicLogo } style={ iconStyle } alt="Toggle Mimic"/>
      </div>
    );
  }
}

export default UIToggle;
