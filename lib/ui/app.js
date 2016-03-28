import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'ui/components/root';

import 'normalize.css/normalize.css';
import 'flexboxgrid';
import 'roboto-fontface';
import 'react-select/dist/react-select.css';
import 'ui/assets/stylesheets/application.scss';

import injectTapEventPlugin from "react-tap-event-plugin";

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

window.React = window.parent.React = React;

const reactContainer = document.createElement('div');
document.body.appendChild(reactContainer);

ReactDOM.render(<Root />, reactContainer);
