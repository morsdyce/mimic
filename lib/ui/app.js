import { API } from '../api/index';
import ReactDOM from 'react-dom';
import React from 'react';

import { ImportExport } from './components/import-export';
import { ScenarioList } from './components/scenario-list';
import { CapturedRequests } from './components/captured-requests';
import { MockedRequests } from './components/mocked-requests';

class Root extends React.Component {

  componentWillMount() {
    Object.observe(API.capturedRequests, () => this.forceUpdate());
    Object.observe(API.mockedRequests, () => this.forceUpdate());
    Object.observe(API.scenarios, () => this.forceUpdate());
  }

  render() {
    return (
      <div>
        <h1>Shredder UI</h1>
        <ImportExport />
        <ScenarioList scenarios={ API.scenarios }
                      addScenario={ API.addScenario }
                      removeScenario={ API.removeScenario }
                      duplicateScenario={ API.duplicateScenario }/>
        <CapturedRequests capturedRequests={ API.capturedRequests }
                          mockedRequests={ API.mockedRequests }
                          mockRequest={ API.mockRequest }/>
        <MockedRequests mockedRequests={ API.mockedRequests }/>
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
