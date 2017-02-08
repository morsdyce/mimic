import React from 'react';
import ReactDOM from 'react-dom';
import Mimic from 'ui/components/new/Mimic';
import EVENTS from 'api/constants/events';
import { Root } from 'ui/components/root';
import Frame from 'react-frame-component';
import injectTapEventPlugin from "react-tap-event-plugin";

let appFrame;

const root = document.createElement('div');
root.style.position = 'fixed';
root.style.width = '100%';
root.style.top = 0;
root.style.left = 0;
root.style.zIndex = 2147483646;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function initFrame() {
  const initialPosition = __ENV === 'development' ? '-100%' : '-100%';

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

  // get the react dev tools to be able to connect to the iframe
  const childDocument = appFrame.contentWindow.document;

  if (__ENV === 'development') {
    const script = childDocument.createElement('script');
    script.innerHTML = '__REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__';
    script.type = 'text/javascript';
    childDocument.body.appendChild(script);
  }
}

function initUI(API) {
  const container = document.createElement('div');
  ReactDOM.render(<Mimic API={ API } onToggle={ toggleUI } />, container);
  document.body.appendChild(container);
}

function toggleUI() {
  const hidden = appFrame.style.top === '-100%';

  window.requestAnimationFrame(() => {
    appFrame.style.top = hidden ? '0' : '-100%';
  });
}

function APIProxy(API) {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'get') {
      event.source.postMessage({
        type: `response_${event.data.resource}`,
        data: JSON.stringify(API[event.data.resource])
      }, event.origin);
    }

    if (event.data.type === 'set') {
      API[event.data.resource](...event.data.payload);
    }
  }, false);


  API.on(EVENTS.RENAME_MOCKED_REQUEST, () => sendMessage({ type: EVENTS.RENAME_MOCKED_REQUEST }));
  API.on(EVENTS.REMOVE_MOCKED_REQUEST, () => sendMessage({ type: EVENTS.REMOVE_MOCKED_REQUEST }));
  API.on(EVENTS.DUPLICATE_MOCKED_REQUEST, () => sendMessage({ type: EVENTS.DUPLICATE_MOCKED_REQUEST }));
  API.on(EVENTS.MOCKED_REQUEST_CHANGE, () => sendMessage({ type: EVENTS.MOCKED_REQUEST_CHANGE }));
  API.on(EVENTS.REQUEST_CAPTURED, () => sendMessage({ type: EVENTS.REQUEST_CAPTURED }));
  API.on(EVENTS.RESPONSE_RECEIVED, () => sendMessage({ type: EVENTS.RESPONSE_RECEIVED }));
  API.on(EVENTS.ADD_MOCKED_REQUEST, () => sendMessage({ type: EVENTS.ADD_MOCKED_REQUEST }));
  API.on(EVENTS.IMPORT, () => sendMessage({ type: EVENTS.IMPORT }));
  API.on(EVENTS.STORAGE_PERSIST, () => sendMessage({ type: EVENTS.STORAGE_PERSIST }));
}

function sendMessage(message) {
  window.onAPIMessage(message);
}

export default function bootstrapUI(API) {
  document.body.appendChild(root);

  ReactDOM.render(
     <Frame >
       <Root />
     </Frame>,
    root, () => {
      appFrame = root.firstChild;
      initFrame();
      APIProxy(API);
      initUI(API);
    });

}
