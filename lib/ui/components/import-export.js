import { API } from 'api';
import React from 'react';

import { NotificationActions } from 'ui/actions/notification';

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
    const blob = new Blob([API.export()], { type: 'application/json' });

    this.state.link.href = URL.createObjectURL(blob);
    this.state.link.click();
  }

  importScenarios(evt) {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      // API.rawData = this.result; // TODO: add checkbox for overriding and invoke this if it's on
      API.import(this.result);

      NotificationActions.createSimple({
        title: 'Import Successful',
        message: 'Configuration imported succefully'
      });

    };

    reader.readAsText(file)
  }

  render() {
    return (
      <div className="import-export">
        <div className="import">
          <i className="fa fa-cloud-upload"></i>
          <input type="file" name="file" encType="multipart/form-data"
                 className="import"
                 onChange={ this.importScenarios.bind(this) }/>
        </div>

        <div className="export" onClick={ this.exportScenarios.bind(this) }>
          <i className="fa fa-cloud-download"></i>
        </div>
      </div>
    );
  }
}
