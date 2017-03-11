import React from 'react';
import BlueButton from 'ui/components/common/BlueButton';
import API from 'api';
import UIState from 'ui/states/UIState';
import SettingsState from 'ui/states/SettingsState';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsHiddenFileInput,
  SettingsBlock,
  ImportErrorMessage
} from 'ui/components/Settings/styled';
import { Div } from 'ui/components/common/base';

class ImportSection extends React.Component {

  componentWillUnmount() {
    SettingsState.resetErrors();
  }

  import = () => {
    if (this.importFileInput) {
      this.importFileInput.click();
    }
  };

  importURL = () => {
    const mode = this.clearCheckbox.checked ? 'clear' : 'append';

    API.importUrl(this.urlInput.value, { mode }, (status) => {
      if (status.success) {
        UIState.setViewMode('mocks');
      } else {
        SettingsState.setError(status.error);
      }
    });
  };

  selectFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const mode = this.clearCheckbox.checked ? 'clear' : 'append';

    reader.onload = function handleFileUpload() {
      API.import(this.result, { mode }).then((status) => {
        if (status.success) {
          UIState.setViewMode('mocks');
        } else {
          SettingsState.setError(status.error);
        }
      });
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
          <Div>
            <label htmlFor="override">
              <input ref={ (node) => this.clearCheckbox = node }
                     id="override"
                     type="radio"
                     defaultChecked
                     name="importMode"/> Clear existing mocks
            </label>
          </Div>

          <Div>
            <label htmlFor="append">
              <input id="append"
                     type="radio"
                     name="importMode"/> Add and disable conflicts
            </label>
          </Div>
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
          { this.props.importFailed && <ImportErrorMessage>Import failed: { this.props.error }</ImportErrorMessage> }
        </SettingsBlock>
      </SettingsSectionContainer>
    );
  }
}

export default ImportSection;
