import React from 'react';
import ReactDOM from 'react-dom';
import {UIToggle} from 'ui/components/ui-toggle';

let appFrame;

function initFrame() {
  appFrame              = require('iframe?name=file-[hash].js!ui/app');
  const initialPosition = __ENV === 'development' ? '0' : '-100%';

  Object.assign(appFrame.style, {
    visibility: 'visible',
    background: 'white',
    width: '100%',
    height: '100%',
    border: 0,
    bottom: 0,
    overflow: 'auto',
    position: 'fixed',
    top: initialPosition,
    transition: 'top .5s',
    zIndex: 2147483646
  });
}

function initUIToggle() {
  let uiToggle = document.createElement('div');

  ReactDOM.render(<UIToggle onToggle={ toggleUI }/>, uiToggle);

  document.body.appendChild(uiToggle);
}

function toggleUI() {
  const hidden = appFrame.style.top === '-100%';

  window.requestAnimationFrame(() => {
    appFrame.style.top = hidden ? '0' : '-100%';
  });
}

export default function bootstrapUI() {
  initFrame();
  initUIToggle();
}
