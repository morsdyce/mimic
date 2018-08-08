import React from 'react';
import ReactDOM from 'react-dom';
import Mimic from 'ui/components/Mimic';

const root = document.createElement('mimic-div');
root.style.width = '100%';
root.style.top = 0;
root.style.left = 0;
root.style.zIndex = 2147483646;

function render() {
  document.body.appendChild(root);
  ReactDOM.render(<Mimic />, root);
}

export default function bootstrapUI() {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'loaded' ||
    document.readyState === 'interactive'
  ) {
    render();
  } else {
    document.addEventListener('DOMContentLoaded', render);
  }
}
