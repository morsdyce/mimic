import React from 'react';
import BlueButton from 'ui/components/common/BlueButton';
import SegmentedSelect from 'ui/components/common/SegmentedSelect';
import API from 'api';
import SettingsState from 'ui/states/SettingsState';
import { copyToClipboard, downloadFile } from 'ui/utils/export';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsBlock,
} from 'ui/components/Settings/styled';

class ExportSection extends React.Component {

  downloadAsFile = () => {
    downloadFile(SettingsState.exportFilename, API.export(SettingsState.prettifyExport));
  };

  copy = () => {
    copyToClipboard(API.export(SettingsState.prettifyExport));
  };

  render() {
    return (
      <SettingsSectionContainer>
        <SettingsSectionTitle>Export</SettingsSectionTitle>

        <SettingsBlock>
          Format and file name
          <SegmentedSelect values={['JSON', 'Postman', 'Swagger']}
                           disabledValues={['Postman', 'Swagger']}
                           selectedValue={ 'JSON' }/>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsInput type="text"
                         value={ SettingsState.exportFilename }
                         onChange={ (event) => SettingsState.set('exportFilename', event.target.value) }
                         onFocus={ (event) => event.target.setSelectionRange(0, event.target.value.length - 5) }/>

          <label htmlFor="prettify">
            <input id="prettify"
                   type="checkbox"
                   checked={ SettingsState.prettifyExport }
                   onChange={ (event) => SettingsState.set('prettifyExport', event.target.checked) }/>
            Prettify
          </label>
        </SettingsBlock>

        <SettingsBlock>
          <BlueButton onClick={ this.downloadAsFile }>Download as file</BlueButton>
          <BlueButton onClick={ this.copy }>Copy to clipboard</BlueButton>
        </SettingsBlock>

        <SettingsBlock>
          To export a particular mock or a group as JSON, right click on it and select "Export"
        </SettingsBlock>
      </SettingsSectionContainer>
    );
  }
}

export default ExportSection;
