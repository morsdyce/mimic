import { API } from '../../api/index';
import React from 'react';

import { CapturedRequests } from './captured-requests';
import { MockedRequests } from './mocked-requests';
import { Scenario } from './scenario';

const SECTIONS = {
  CAPTURED_REQUESTS: 'CapturedRequests',
  MOCKED_REQUESTS: 'MockedRequests',
  SCENARIO: 'Scenario'
};

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
      <CapturedRequests capturedRequests={ API.capturedRequests }
                        mockedRequests={ API.mockedRequests }
                        mockRequest={ API.mockRequest }/>
    )
  }

  _mockedRequests() {
    return <MockedRequests mockedRequests={ API.mockedRequests }/>;
  }

  _scenario() {
    const scenario = this._getCurrentScenario();

    return (
      <Scenario id={ scenario.id }
                name={ scenario.name }
                mockedRequests={ scenario.mockedRequests }
                renameScenario={ API.renameScenario }
                removeScenario={ API.removeScenario }
                duplicateScenario={ API.duplicateScenario }/>
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
    return this._getCurrentSection();
  }

}
