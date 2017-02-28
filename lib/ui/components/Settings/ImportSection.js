import React from 'react';
import BlueButton from 'ui/components/common/BlueButton';
import API from 'api';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsHiddenFileInput,
  SettingsBlock,
  ImportSuccessMessage,
  ImportErrorMessage
} from 'ui/components/Settings/styled';

class ImportSection extends React.Component {

  state = {
    importSuccess: null,
    importFailed: null,
    error: null
  };

  import = () => {
    if (this.importFileInput) {
      this.importFileInput.click();
    }
  };

  importURL = () => {
    const mode = this.clearCheckbox.checked ? 'clear' : 'append';

    API.importUrl(this.urlInput.value, { mode }, (status) => {
      if (status.success) {
        this.setState({ importSuccess: true, importFailed: false });
      } else {
        this.setState({ importFailed: true, importSuccess: false, error: status.error });
      }
    })
  };

  selectFile = (event) => {
    const self = this;
    const file = event.target.files[0];
    const reader = new FileReader();
    const mode = this.clearCheckbox.checked ? 'clear' : 'append';

    reader.onload = function handleFileUpload() {
      const status = API.import(this.result, { mode });

      if (status.success) {
        self.setState({ importSuccess: true, importFailed: false });
      } else {
        self.setState({ importFailed: true, importSuccess: false, error: status.error });
      }
    };

    reader.readAsText(file);
  };

  render() {
    return (
      <SettingsSectionContainer>
        <SettingsSectionTitle>Import</SettingsSectionTitle>

        <SettingsBlock>
          <SettingsInput type="text"
                         defaultValue="https://..."
                         innerRef={ (node) => this.urlInput = node }
                         onFocus={ (event) => event.target.select() }/>

          or Select a local file (or drag & drop)
        </SettingsBlock>

        <SettingsBlock>
          <div>
            <label htmlFor="override">
              <input
                ref={ (node) => this.clearCheckbox = node }
                id="override"
                type="radio"
                defaultChecked
                name="importMode"/> Clear existing mocks
            </label>
          </div>

          <div>
            <label htmlFor="append">
              <input
                ref={ (node) => this.appendCheckbox = node }
                id="append"
                type="radio"
                name="importMode"/> Add and disable conflicts
            </label>
          </div>
        </SettingsBlock>

        <SettingsBlock>
          <BlueButton onClick={ this.import }>Import from file</BlueButton>

          <SettingsHiddenFileInput innerRef={ (node) => this.importFileInput = node }
                                   type="file"
                                   name="file"
                                   encType="multipart/form-data"
                                   onChange={ this.selectFile }/>

          <BlueButton onClick={ this.importURL }>Import from URL</BlueButton>
        </SettingsBlock>

        <SettingsBlock>
          Postman and Swagger formats support coming soon
        </SettingsBlock>

        <SettingsBlock>
          { this.state.importSuccess && <ImportSuccessMessage>Imported successfully</ImportSuccessMessage> }
          { this.state.importFailed &&
          <ImportErrorMessage>Import failed: { this.state.error }</ImportErrorMessage> }
        </SettingsBlock>
      </SettingsSectionContainer>
    );
  }
}

export default ImportSection;
