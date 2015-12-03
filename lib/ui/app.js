import { API } from 'api/index';
import ReactDOM from 'react-dom';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { ImportExport } from './components/import-export';
import { ScenarioList } from './components/scenario-list';
import { MainPanel } from './components/main-panel';

import SECTIONS from 'api/constants/sections';

@DragDropContext(HTML5Backend)
class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentSection: SECTIONS.CAPTURED_REQUESTS
    }
  }

  componentWillMount() {
    Object.observe(API.capturedRequests, () => this.forceUpdate());
    Object.observe(API.mockedRequests, () => this.forceUpdate());
    Object.observe(API.scenarios, () => this.forceUpdate());
  }

  _setCurrentSection(sectionName) {
    this.setState({ currentSection: sectionName });
  }

  render() {
    return (
      <div>
        <h1>Shredder UI</h1>

        <ul>
          <li>
            <a onClick={ this._setCurrentSection.bind(this, SECTIONS.CAPTURED_REQUESTS) }>
              Captured Requests
            </a>
          </li>
          <li>
            <a onClick={ this._setCurrentSection.bind(this, SECTIONS.MOCKED_REQUESTS) }>
              Mocked Requests
            </a>
          </li>
        </ul>

        <ImportExport />

        <ScenarioList onSelect={ this._setCurrentSection.bind(this, SECTIONS.SCENARIO) } />

        <MainPanel currentSection={ this.state.currentSection }/>
      </div>
    );
  }
}

let shredderFrame;

export class App {

  static bootstrap() {
    App.initFrame();
    App.initReactApplication();
    App.initLabel();
  }

  static initFrame() {
    shredderFrame = document.createElement('iframe');
    shredderFrame.hidden = true;

    Object.assign(shredderFrame, {
      src: '',
      width: '100%',
      height: '100%'
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
