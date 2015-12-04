import React from 'react';

import { ImportExport } from 'ui/components/import-export';
import { ScenarioList } from 'ui/components/scenario-list';
import { MainNav } from 'ui/components/main-nav';

import SECTIONS from 'api/constants/sections';

export class Sidebar extends React.Component {

  static get propTypes() {
    return {
      currentSection: React.PropTypes.string.isRequired,
      setCurrentSection: React.PropTypes.func.isRequired
    }
  }

  _setCurrentSection(sectionName, scenario) {
    this.props.setCurrentSection(sectionName, scenario);
  }

  render() {
    return (
      <div className="sidebar">
        <ImportExport />

        <MainNav currentSection={ this.props.currentSection }
                 setCurrentSection={ this._setCurrentSection.bind(this) }/>

        <ScenarioList
          isScenarioSelected={ this.props.currentSection === SECTIONS.SCENARIO }
          onSelect={ this._setCurrentSection.bind(this, SECTIONS.SCENARIO) }/>
      </div>
    );
  }
}
