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
      currentSection: React.PropTypes.oneOf(availableSections)
    }
  }

  _getCurrentScenario() {
    return API.getCurrentScenario();
  }

  _capturedRequests() {
    return (
      <CapturedRequests />
    );
  }

  _mockedRequests() {
    return <MockedRequests mockedRequests={ API.mockedRequests }/>;
  }

  _scenario() {
    const scenario = this._getCurrentScenario();

    return (
      <Scenario id={ scenario.id }
                name={ scenario.name }
                mockedRequests={ scenario.mockedRequests }/>
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
