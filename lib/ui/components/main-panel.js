import { API } from 'api';
import React from 'react';

import { CapturedRequests } from 'ui/components/captured-requests';
import { MockedRequests } from 'ui/components/mocked-requests';
import { Scenario } from 'ui/components/scenario';

import SECTIONS from 'api/constants/sections';

export class MainPanel extends React.Component {

  static get propTypes() {
    const availableSections = Object.keys(SECTIONS).map((key) => SECTIONS[key]);

    return {
      currentSection: React.PropTypes.oneOf(availableSections),
      selectedScenario: React.PropTypes.object,
      editedMockedRequestId: React.PropTypes.string,
      editMockedRequest: React.PropTypes.func.isRequired
    }
  }

  _capturedRequests() {
    return (
      <CapturedRequests editMockedRequest={ this.props.editMockedRequest }/>
    );
  }

  _mockedRequests() {
    return <MockedRequests mockedRequests={ API.mockedRequests }
                           editedMockedRequestId={ this.props.editedMockedRequestId }/>;
  }

  _scenario() {
    const scenario = this.props.selectedScenario;

    return (
      <Scenario id={ scenario.id }
                name={ scenario.name }
                mockedRequests={ scenario.mockedRequests }
                editMockedRequest={ this.props.editMockedRequest }/>
    );
  }

  _getCurrentSection() {
    switch (this.props.currentSection) {

      case SECTIONS.CAPTURED_REQUESTS:
        return this._capturedRequests();

      case SECTIONS.MOCKED_REQUESTS:
        return this._mockedRequests();

      case SECTIONS.SCENARIO:
        return this._scenario();

      default:
        return this._capturedRequests();
    }
  }

  render() {
    return (
      <div className="main-panel">
        { this._getCurrentSection() }
      </div>
    )
  }

}
