import React from 'react';
import BlueButton from 'ui/components/common/BlueButton';
import SelectBar from 'ui/components/common/SelectBar';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import { copyToClipboard, downloadFile } from 'ui/utils/export';
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsInput,
  SettingsBlock,
} from 'ui/components/Settings/styled';

class ExportSection extends React.Component {

  downloadAsFile = () => {
    downloadFile(UIState.exportFilename, API.export(UIState.prettifyExport));
  };

  copy = () => {
    copyToClipboard(API.export(UIState.prettifyExport));
  };

  render() {
    return (
      <SettingsSectionContainer>
        <SettingsSectionTitle>Export</SettingsSectionTitle>

        <SettingsBlock>
          Format and file name
          <SelectBar values={['JSON', 'Postman', 'Swagger']}
                     disabledValues={['Postman', 'Swagger']}
                     selectedValue={ 'JSON' }/>
        </SettingsBlock>

        <SettingsBlock>
          <SettingsInput type="text"
                         value={ UIState.exportFilename }
                         onChange={ (event) => UIState.update({ exportFilename: event.target.value }) }
                         onFocus={ (event) => event.target.setSelectionRange(0, event.target.value.length - 5) }/>

          <label htmlFor="prettify">
            <input id="prettify"
                   type="checkbox"
                   checked={ UIState.prettifyExport }
                   onChange={ (event) => UIState.update({ prettifyExport: event.target.checked }) }/>
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

export default UIStateListener(ExportSection);
