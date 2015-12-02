import { API } from 'api/index';
import ReactDOM from 'react-dom';
import React from 'react';

import { ImportExport } from './components/import-export';
import { ScenarioList } from './components/scenario-list';
import { MainPanel } from './components/main-panel';

import SECTIONS from 'api/constants/sections';

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
    shredderFrame = document.createElement('div');

    App.initReactComponent();
    App.initLabel();
  }

  static initReactComponent() {
    shredderFrame.hidden = true;

    document.body.appendChild(shredderFrame);
    ReactDOM.render(<Root />, shredderFrame);
  }

  static initLabel() {
    let label = document.createElement('img');

    label.src = '/ui/assets/images/bdsm-label.png';
    label.style.cursor = 'pointer';
    label.style.position = 'fixed';
    label.style.bottom = '20px';
    label.style.right = '20px';

    label.onclick = () => App.toggleUI();

    document.body.appendChild(label);
  }

  static toggleUI() {
    shredderFrame.hidden = !shredderFrame.hidden;
  }

}
