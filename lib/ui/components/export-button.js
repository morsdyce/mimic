import React, { Component } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import { FileDownload } from 'ui/components/file-download';
import { API } from 'api';

class ExportButton extends Component {
  handleClick() {
    if (this.props.mode === 'scenarios' && this.props.scenarioId) {
      const scenariosIds = this.props.scenarioId.split(',');
      this.props.performExport(API.exportScenarios(scenariosIds, this.props.prettify));
    } else if (this.props.mode === 'mocks' && this.props.scenarioId && this.props.mockId) {
      const mockIds = this.props.mockId.split(',');
      this.props.performExport(API.exportMocks(this.props.scenarioId, mockIds, this.props.prettify));
    } else {
      this.props.performExport(API.export(this.props.prettify));
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <FlatButton
        label="Export"
        primary={true}
        onClick={ this.handleClick.bind(this) }
      />
    );
  }
}

export default FileDownload(ExportButton);