import { API } from 'api/index';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';

import { DragDropContext } from 'react-dnd';
import { ImportExport } from 'ui/components/import-export';
import { ScenarioList } from 'ui/components/scenario-list';
import { MainPanel } from 'ui/components/main-panel';

import SECTIONS from 'api/constants/sections';

@DragDropContext(HTML5Backend)
export class Root extends React.Component {

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
    this.setState({currentSection: sectionName});
  }

  render() {
    return (
      <div>
        <h1>Shredder UI</h1>

        <ul>
          <li>
            <a
              onClick={ this._setCurrentSection.bind(this, SECTIONS.CAPTURED_REQUESTS) }>
              Captured Requests
            </a>
          </li>
          <li>
            <a
              onClick={ this._setCurrentSection.bind(this, SECTIONS.MOCKED_REQUESTS) }>
              Mocked Requests
            </a>
          </li>
        </ul>

        <ImportExport />

        <ScenarioList
          onSelect={ this._setCurrentSection.bind(this, SECTIONS.SCENARIO) }/>

        <MainPanel currentSection={ this.state.currentSection }/>
      </div>
    );
  }
}
