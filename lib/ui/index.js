import React from 'react';
import ReactDOM from 'react-dom';
import Mimic from 'ui/components/Mimic';

const root = document.createElement('div');
root.style.position = 'fixed';
root.style.width = '100%';
root.style.top = 0;
root.style.left = 0;
root.style.zIndex = 2147483646;

export default function bootstrapUI() {
  document.body.appendChild(root);

  ReactDOM.render(<Mimic />, root);
}
