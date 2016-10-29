import React, { Component } from 'react';
import { FileDownload } from 'ui/components/file-download';
import ExportModal from 'ui/components/modals/export';

import CloudDownloadIcon from 'material-ui/lib/svg-icons/file/cloud-download';


export class Export extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  onClose() {
    this.setState({ open: false });
  }

  handleClick() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div className="col-xs-4 cursor-pointer" onClick={ this.handleClick.bind(this) }>
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

        <ExportModal open={ this.state.open }
                     onClose={ this.onClose.bind(this) }
                     onConfirm={ this.props.onConfirm }/>

      </div>
    );
  }
}

export default FileDownload(Export);