import React from 'react';
import HTML5IFrameBackend from 'react-dnd-html5-iframe-backend';
import { DragDropContext } from 'react-dnd';

import { API } from 'api/index';
import { Sidebar } from 'ui/components/sidebar';
import { MainPanel } from 'ui/components/main-panel';

import SECTIONS from 'api/constants/sections';

@DragDropContext(HTML5IFrameBackend)
export class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = { currentSection: SECTIONS.CAPTURED_REQUESTS };
  }

  componentWillMount() {
    Object.observe(API.capturedRequests, () => this.forceUpdate());
    Object.observe(API.mockedRequests, () => this.forceUpdate());
    Object.observe(API.scenarios, () => this.forceUpdate());
  }

  _setCurrentSection(sectionName, scenario) {
    this.setState({ currentSection: sectionName, selectedScenario: scenario });
  }

  render() {
    return (
      <div className="root">

        <Sidebar currentSection={ this.state.currentSection }
                 setCurrentSection={ this._setCurrentSection.bind(this) }/>

        <MainPanel currentSection={ this.state.currentSection }
                   selectedScenario={this.state.selectedScenario }/>
      </div>
    );
  }
}
