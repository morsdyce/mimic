import React, { Component } from 'react';
import { API } from 'api';
import { FileDownload } from 'ui/components/file-download';

import CloudDownloadIcon from 'material-ui/lib/svg-icons/file/cloud-download';


export class Export extends Component {
  render() {
    return (
      <div className="col-xs-4 cursor-pointer" onClick={ () => this.props.performExport(API.export()) }>
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
}

export default FileDownload(Export);