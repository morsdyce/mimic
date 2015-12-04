import React from 'react';
import HTML5IFrameBackend from 'react-dnd-html5-iframe-backend';
import { DragDropContext } from 'react-dnd';

import { API } from 'api/index';
import { ImportExport } from 'ui/components/import-export';
import { ScenarioList } from 'ui/components/scenario-list';
import { MainNav } from 'ui/components/main-nav';
import { MainPanel } from 'ui/components/main-panel';

import SECTIONS from 'api/constants/sections';

@DragDropContext(HTML5IFrameBackend)
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

  _setCurrentSection(sectionName, scenario) {
    this.setState({
      currentSection: sectionName,
      selectedScenario: scenario
    });
  }

  render() {
    return (
      <div className="root">

        <div className="sidebar">
          <ImportExport />

          <MainNav currentSection={ this.state.currentSection }
                   setCurrentSection={ this._setCurrentSection.bind(this) }/>

          <ScenarioList
            isScenarioSelected={ this.state.currentSection === SECTIONS.SCENARIO }
            onSelect={ this._setCurrentSection.bind(this, SECTIONS.SCENARIO) }/>
        </div>

        <MainPanel currentSection={ this.state.currentSection }
                   selectedScenario={this.state.selectedScenario }/>
      </div>
    );
  }
}
