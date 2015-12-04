import React from 'react';
import cx from 'classnames';

import { API } from 'api/index';
import { ActiveIndicator } from 'ui/components/active-indicator';

import SECTIONS from 'api/constants/sections';

export class MainNav extends React.Component {

  static get propTypes() {
    return {
      currentSection: React.PropTypes.string.isRequired,
      setCurrentSection: React.PropTypes.func.isRequired
    }
  }

  _setCurrentSection(sectionName, scenario) {
    this.props.setCurrentSection(sectionName, scenario);
  }

  _getSelectedClass(selectedSection) {
    return cx({ selected: this.props.currentSection === selectedSection });
  }

  render() {
    return (
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
    );
  }
}
