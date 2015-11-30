import { API } from '../api/index';
import ReactDOM from 'react-dom';
import React from 'react';

import { ImportExport } from './components/import-export';
import { ScenarioList } from './components/scenario-list';

class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Shredder UI</h1>
        <ImportExport />
        <ScenarioList scenarios={ API.scenarios }
                      addScenario={ API.addScenario }
                      removeScenario={ API.removeScenario }
                      duplicateScenario={ API.duplicateScenario }/>
      </div>
    );
  }
}

export class App {

  static bootstrap() {
    let shredderFrame = document.createElement('div');
    document.body.appendChild(shredderFrame);

    ReactDOM.render(<Root />, shredderFrame);

    shredderFrame = undefined;
  }

}
