// Load the styles of the app (isolated inside the iframe)
import normalize from 'normalize.css/normalize.css';
import appStyle from 'ui/assets/stylesheets/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'ui/components/root';
import { UIToggle } from 'ui/components/ui-toggle';
import ENV from 'api/constants/env';

let appFrame;

export class App {

  static bootstrap() {
    App.initFrame();
    App.initFrameStyles();
    App.initReactApplication();
    App.initUIToggle();
  }

  static initFrame() {
    appFrame = document.createElement('iframe');
    const initialPosition = ENV.development ? '0' : '-100%';

    Object.assign(appFrame, {
      src: '',
      width: '100%',
      height: '100%'
    });

    Object.assign(appFrame.style, {
      background: 'white',
      border: 0,
      position: 'fixed',
      top: initialPosition,
      transition: 'top .5s',
      bottom: 0
    });

    document.body.appendChild(appFrame);
  }

  static initFontAwesome() {
    const frameRoot = appFrame.contentDocument;
    const fontAwesome = frameRoot.createElement('link');

    Object.assign(fontAwesome, {
      rel: 'stylesheet',
      href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'
    });

    frameRoot.head.appendChild(fontAwesome);
  }

  static initFrameStyles() {
    App.initFontAwesome();

    const frameRoot = appFrame.contentDocument;
    const style     = frameRoot.createElement('style');

    style.innerText = normalize.toString();
    style.innerText += appStyle.toString();

    frameRoot.head.appendChild(style);
  }

  static initReactApplication() {
    const frameRoot      = appFrame.contentDocument;
    const reactContainer = frameRoot.createElement('div');

    ReactDOM.render(<Root />, reactContainer);

    frameRoot.body.appendChild(reactContainer);
  }

  static initUIToggle() {
    let uiToggle = document.createElement('div');

    ReactDOM.render(<UIToggle onToggle={ App.toggleUI }/>, uiToggle);

    document.body.appendChild(uiToggle);
  }

  static toggleUI() {
    const hidden = appFrame.style.top === '-100%';

    window.requestAnimationFrame(() => {
      appFrame.style.top = hidden ? '0' : '-100%';
    });
  }

}
