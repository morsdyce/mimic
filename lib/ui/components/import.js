import React, { Component, PropTypes } from 'react';
import CloudUploadIcon from 'material-ui/lib/svg-icons/file/cloud-upload';

export class Import extends Component {

  render() {
    return (
      <div className="col-xs-4 import cursor-pointer">
        <div className="row center-xs">
          <div className="col-xs-12">
            <CloudUploadIcon style={{fill: '#fff'}}/>
            <input type="file" name="file" encType="multipart/form-data"
                   onChange={ this.selectFile.bind(this) }/>
          </div>
        </div>

        <div className="row center-xs">
          <div className="col-xs-12">
            Import
          </div>
        </div>
      </div>
    );
  }

  selectFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const importData = this.props.import;

    reader.onload = function() {
      importData(this.result);

      // TODO: add notification
    };

    reader.readAsText(file)
  }

}

Import.PropTypes = {
  import: PropTypes.func.required
};