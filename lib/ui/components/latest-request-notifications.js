import React from 'react';

const containerStyle = {
  position: 'fixed',
  left: '5px',
  bottom: '5px',
  backgroundColor: '#f7f7f7',
  fontFamily: 'Arial, sans-serif',
  fontSize: '12px',
  padding: '4px 8px',
  borderRadius: '4px'
};

const containerHoverStyle = {
  cursor: 'pointer',
  backgroundColor: '#c8dcf4'
};

const methodStyle = {
  display: 'inline-block',
  fontWeight: 'bold'
};

const urlStyle = {
  display: 'inline-block'
};

const actionsStyle = {
  display: 'inline-block'
};

const LatestRequestNotifications = () => (
  <div style={ containerStyle }>
    <div style={ methodStyle }>POST</div>
    <div style={ urlStyle }>save-text?id=new</div>
    <div style={ actionsStyle }>Edit</div>
  </div>
);

export default LatestRequestNotifications;
