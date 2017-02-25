import React from 'react';
import styled from 'styled-components';
import Frame from 'ui/components/Frame';
import BlueButton from 'ui/components/styled/BlueButton';
import RedButton from 'ui/components/styled/RedButton';
import SelectBar from 'ui/components/SelectBar';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import { copyToClipboard, downloadFile } from 'ui/utils/export';

const Container = styled.div`
  text-align: center;
`;

const Section = styled.div`
  border-right: 1px solid #f0f0f0;
  display: inline-block;
  vertical-align: top;
  width: 270px;
  padding: 0 60px;
  text-align: left;
  margin-top: 5%;
  
  &:last-child {
    border-right: none;
   }
`;

const Title = styled.div`
  font-weight: 600;
`;

const Input = styled.input`
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex: 1;
  height: 24px;
  outline: 0;
  font-size: 13px;
  line-height: 20px;
  padding: 0 6px;
  display: block;
  width: 100%;
  
  &:focus {
    border: 2px solid #b2c9ee;
    box-sizing: border-box;
    padding: 0 4px;
  }
`;

const Block = styled.div`
  margin-bottom: 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImportErrorMessage = styled.div`
  color: #ba3a00;
`;

const ImportSuccessMessage = styled.div`
  color: green;
`;

class Settings extends React.Component {

  state = {
    importSuccess: null,
    importFailed: null,
    error: null
  };

  downloadAsFile = () => {
    downloadFile(UIState.exportFilename, API.export(UIState.prettifyExport));
  };

  copy = () => {
    copyToClipboard(API.export(UIState.prettifyExport));
  };

  wipeOut = () => {
    if (UIState.allowWipeout) {
      API.clearStorage();
      UIState.update({ allowWipeout: false })
    }
  };

  componentWillUnmount() {
    UIState.update({ allowWipeout: false })
  }

  import = () => {
    if (this.importFileInput) {
      this.importFileInput.base.click();
    }
  };

  importURL = () => {
    API.importUrl(this.urlInput.value, (status) => {
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

    reader.onload = function handleFileUpload() {
      const status = API.import(this.result);

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
      <Frame>
        <Container>
          <Section>
            <Title>Import</Title>

            <Block>
              <Input type="text"
                     defaultValue="https://..."
                     innerRef={ (node) => this.urlInput = node }
                     onFocus={ (event) => event.target.select() }/>

              or Select a local file (or drag & drop)
            </Block>

            <Block>
              <div>
                <label htmlFor="override">
                  <input id="override" type="radio" checked={ true }/> Clear existing mocks
                </label>
              </div>

              <div>
                <label htmlFor="append">
                  <input id="append" type="radio" checked={ false }/> Add and disable conflicts
                </label>
              </div>
            </Block>

            <Block>
              <BlueButton onClick={ this.import }>Import from file</BlueButton>

              <HiddenFileInput ref={ (node) => this.importFileInput = node }
                               type="file"
                               name="file"
                               encType="multipart/form-data"
                               onChange={ this.selectFile }/>

              <BlueButton onClick={ this.importURL }>Import from URL</BlueButton>
            </Block>

            <Block>
              Postman and Swagger formats support coming soon
            </Block>

            <Block>
              { this.state.importSuccess && <ImportSuccessMessage>Imported successfully</ImportSuccessMessage> }
              { this.state.importFailed && <ImportErrorMessage>Import failed: { this.state.error }</ImportErrorMessage> }
            </Block>
          </Section>

          <Section>
            <Title>Export</Title>

            <Block>
              Format and file name
              <SelectBar values={['JSON', 'Postman', 'Swagger']}
                         disabledValues={['Postman', 'Swagger']}
                         selectedValue={ 'JSON' }/>
            </Block>

            <Block>
              <Input type="text"
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
            </Block>

            <Block>
              <BlueButton onClick={ this.downloadAsFile }>Download as file</BlueButton>
              <BlueButton onClick={ this.copy }>Copy to clipboard</BlueButton>
            </Block>

            <Block>
              To export a particular mock or a group as JSON, right click on it and select "Export"
            </Block>
          </Section>

          <Section>
            <Title>Settings</Title>

            <Block>
              <label htmlFor="always-show">
                <input id="always-show"
                       type="checkbox"
                       checked={ UIState.settings.alwaysShowMimicButtons }
                       onChange={ (event) => UIState.updateSetting({ alwaysShowMimicButtons: event.target.checked }) }/>
                Always show Mimic buttons
              </label>
            </Block>

            <Block>
              Hotkey to show and hide Mimic
              <Input type="text" value={ UIState.settings.mimicHotkey }/>
            </Block>

            <Block>
              <label htmlFor="analytics">
                <input id="analytics"
                       type="checkbox"
                       checked={ UIState.settings.sendAnalytics }
                       onChange={ (event) => UIState.updateSetting({ sendAnalytics: event.target.checked }) }/>
                Send anonymous usage stats
              </label>
            </Block>

            <Block>
              <input type="checkbox"
                     checked={ UIState.allowWipeout }
                     onChange={ (event) => UIState.update({ allowWipeout: event.target.checked }) }/>
              &nbsp;
              <RedButton onClick={ this.wipeOut } disabled={ !UIState.allowWipeout }>
                Remove all mimic data
              </RedButton>
            </Block>
          </Section>
        </Container>
      </Frame>
    );
  }
}

export default UIStateListener(Settings);
