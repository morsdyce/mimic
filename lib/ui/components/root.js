import React from 'react';
import HTML5IFrameBackend from 'react-dnd-html5-iframe-backend';
import { DragDropContext } from 'react-dnd';
import cx from 'classnames';

import { API } from 'api/index';
import { ImportExport } from 'ui/components/import-export';
import { ScenarioList } from 'ui/components/scenario-list';
import { MainPanel } from 'ui/components/main-panel';
import { ActiveIndicator } from 'ui/components/active-indicator';

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

  _getSelectedClass(selectedSection) {
    return cx({
      selected: this.state.currentSection === selectedSection
    });
  }

  render() {
    return (
      <div className="root">
        <div className="sidebar">
          <ImportExport />

          <ul className="main-nav">
            <li>
              <a
                className={ this._getSelectedClass(SECTIONS.CAPTURED_REQUESTS) }
                onClick={ this._setCurrentSection.bind(this, SECTIONS.CAPTURED_REQUESTS) }>
                Captured Requests
              </a>
            </li>
            <li>
              <a
                className={ this._getSelectedClass(SECTIONS.MOCKED_REQUESTS) }
                onClick={ this._setCurrentSection.bind(this, SECTIONS.MOCKED_REQUESTS) }>
                <ActiveIndicator active={ API.currentScenario === 'MockedRequests' }
                                 onEnable={ () => API.setCurrentScenario('MockedRequests') }
                                 onDisable={ () => API.setCurrentScenario(null) }/>
                Mocked Requests
              </a>
            </li>
          </ul>

          <ScenarioList
            onSelect={ this._setCurrentSection.bind(this, SECTIONS.SCENARIO) }/>
        </div>

        <MainPanel currentSection={ this.state.currentSection }
                   selectedScenario={this.state.selectedScenario }/>
      </div>
    );
  }
}
