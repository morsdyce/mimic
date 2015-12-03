import frameStyle from 'ui/assets/stylesheets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'ui/components/root';

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

    Object.assign(appFrame, {
      src: '',
      width: '100%',
      height: '100%'
    });

    Object.assign(appFrame.style, {
      background: 'white',
      border: 0,
      position: 'fixed',
      top: '-100%',
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

    style.innerText = frameStyle.toString();

    frameRoot.head.appendChild(style);
  }

  static initReactApplication() {
    const frameRoot      = appFrame.contentDocument;
    const reactContainer = frameRoot.createElement('div');

    ReactDOM.render(<Root />, reactContainer);

    frameRoot.body.appendChild(reactContainer);
  }

  static initUIToggle() {
    let label = document.createElement('img');

    Object.assign(label, {
      src: '/ui/assets/images/bdsm-label.png',
      onclick: () => App.toggleUI(),
      onmouseenter: () => label.style['box-shadow'] = '0 8px 7px -7px rgba(0, 0, 0, .7)',
      onmouseleave: () => label.style['box-shadow'] = 'initial'
    });

    Object.assign(label.style, {
      cursor: 'pointer',
      opacity: '0',
      transition: 'opacity .5s, box-shadow .15s',
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    });

    document.body.appendChild(label);

    setTimeout(() => label.style.opacity = '1', 0);
  }

  static toggleUI() {
    const hidden = appFrame.style.top === '-100%';

    window.requestAnimationFrame(() => {
      appFrame.style.top = hidden ? '0px' : '-100%';
    });
  }

}
