import React, { Component } from 'react';
import { API } from 'api';

import CloudDownloadIcon from 'material-ui/lib/svg-icons/file/cloud-download';


export class Export extends Component {

  constructor(props) {
    super(props);

    this.state = {
      link: document.createElement('a')
    };

    this.state.link.download = 'scenarios.json';
  }

  render() {
    return (
      <div className="col-xs-4 cursor-pointer" onClick={ this.exportScenarios.bind(this) }>
        <div className="row center-xs">
          <div className="col-xs-12">
            <CloudDownloadIcon style={{fill: '#fff'}}/>
          </div>
        </div>

        <div className="row center-xs">
          <div className="col-xs-12">
            Export
          </div>
        </div>

      </div>
    );
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

}
