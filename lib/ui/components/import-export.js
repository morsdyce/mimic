import { API } from 'api/index';
import React from 'react';

export class ImportExport extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      link: document.createElement('a')
    };

    this.state.link.download = 'scenarios.json';
  }

  componentWillUnmount() {
    this.state.link.remove();
    this.state.link = undefined;
  }

  exportScenarios() {
    const blob = new Blob([API.rawData], { type: 'application/json' });

    this.state.link.href = URL.createObjectURL(blob);
    this.state.link.click();
  }

  importScenarios() {
    // TODO: Implement import from file
  }

  render() {
    return (
      <div>
        <button onClick={ this.importScenarios.bind(this) }>Import</button>
        <button onClick={ this.exportScenarios.bind(this) }>Export</button>
      </div>
    );
  }
}
