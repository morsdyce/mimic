import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'ui/components/root';

let shredderFrame;

export class App {

  static bootstrap() {
    App.initFrame();
    App.initReactApplication();
    App.initLabel();
  }

  static initFrame() {
    shredderFrame = document.createElement('iframe');

    Object.assign(shredderFrame, {
      src: '',
      width: '100%',
      height: '100%',
      hidden: true
    });

    Object.assign(shredderFrame.style, {
      background: 'white',
      border: 0,
      position: 'fixed',
      top: 0,
      bottom: 0
    });

    document.body.appendChild(shredderFrame);
  }

  static initReactApplication() {
    const frameRoot      = shredderFrame.contentDocument;
    const reactContainer = frameRoot.createElement('div');

    ReactDOM.render(<Root />, reactContainer);

    frameRoot.body.appendChild(reactContainer);
  }

  static initLabel() {
    let label = document.createElement('img');

    Object.assign(label, {
      src: '/ui/assets/images/bdsm-label.png',
      onclick: () => App.toggleUI()
    });

    Object.assign(label.style, {
      cursor: 'pointer',
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    });

    document.body.appendChild(label);
  }

  static toggleUI() {
    shredderFrame.hidden = !shredderFrame.hidden;
  }

}
