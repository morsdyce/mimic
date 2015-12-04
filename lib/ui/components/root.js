import React from 'react';
import HTML5IFrameBackend from 'react-dnd-html5-iframe-backend';
import { DragDropContext } from 'react-dnd';

import { API } from 'api/index';
import { Sidebar } from 'ui/components/sidebar';
import { MainPanel } from 'ui/components/main-panel';

import SECTIONS from 'api/constants/sections';
import EVENTS from 'api/constants/events';

@DragDropContext(HTML5IFrameBackend)
export class Root extends React.Component {

  constructor(props) {
    super(props);

    this.state = { currentSection: SECTIONS.CAPTURED_REQUESTS };
  }

  componentDidMount() {
    this._updateUI = () => this.forceUpdate();

    API.on(EVENTS.STORAGE_PERSIST, this._updateUI);
    API.on(EVENTS.REQUEST_CAPTURED, this._updateUI);
  }

  componentWillUnmount() {
    API.off(EVENTS.STORAGE_PERSIST, this._updateUI);
    API.off(EVENTS.REQUEST_CAPTURED, this._updateUI);
  }

  _setCurrentSection(sectionName, scenario, mockedRequestId) {
    this.setState({
      currentSection: sectionName,
      selectedScenario: scenario,
      editedMockedRequestId: mockedRequestId
    });
  }

  _editMockedRequest(mockedRequestId) {
    this._setCurrentSection(SECTIONS.MOCKED_REQUESTS, null, mockedRequestId);
  }

  render() {
    return (
      <div className="root">

        <Sidebar currentSection={ this.state.currentSection }
                 setCurrentSection={ this._setCurrentSection.bind(this) }/>

        <MainPanel currentSection={ this.state.currentSection }
                   selectedScenario={ this.state.selectedScenario }
                   editedMockedRequestId={ this.state.editedMockedRequestId }
                   editMockedRequest={ this._editMockedRequest.bind(this) }/>
      </div>
    );
  }
}
