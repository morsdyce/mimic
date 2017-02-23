import React from 'react';
import styled from 'styled-components';
import { getWindowSize } from 'ui/utils/measurements';
import ResizeHandle from 'ui/components/common/ResizeHandle';
import MimicControls from 'ui/components/MimicControls';
import MainControls from 'ui/components/common/MainControls';
import BlueButton from 'ui/components/styled/BlueButton';
import SelectBar from 'ui/components/SelectBar';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 51px);
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  background-color: white;
  border-top: 1px solid #e7e7e7;
  bottom: 51px;
  z-index: 999999999999;
`;

const Section = styled.div`
  border-right: 1px solid #f0f0f0;
  display: inline-block;
  vertical-align: top;
  width: 260px;
  padding: 0 60px;
  
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
  flex-grow: 1;
  height: 24px;
  outline: 0;
  font-size: 13px;
  padding: 0 6px;
  display: block;
  width: 100%;
`;

const Block = styled.div`
  margin-bottom: 10px;
`;

class RequestLog extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.closeOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.closeOnEscape);
  }

  closeOnEscape = (event) => {
    if (event.keyCode === 27) {
      UIState.update({ viewMode: 'closed' });
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: getWindowSize(UIState.editorHeight) }}>
        <ResizeHandle horizontal/>

        <MimicControls fullWidth>
          <MainControls/>
        </MimicControls>

        <Container>

          <Section>
            <Title>Import</Title>

            <Block>
              <Input type="text" value={ 'https://...' }/>

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

            <BlueButton>Import from file</BlueButton>
            <BlueButton>Import from clipboard</BlueButton>

            <Block>
              Mimic, Postman or Swagger format
            </Block>
          </Section>

          <Section>
            <Title>Export</Title>

            <Block>
              Format and file name
              <SelectBar values={['JSON', 'Postman', 'Swagger']}
                         selectedValue={ 'JSON' }/>
            </Block>

            <Block>
              <Input type="text" value={ 'mocks.json' }/>

              <label htmlFor="prettify">
                <input id="prettify" type="checkbox" checked={ true }/> Prettify
              </label>
            </Block>

            <BlueButton>Download as file</BlueButton>
            <BlueButton>Copy to clipboard</BlueButton>

            <Block>
              To export a particular mock or a group as JSON, right click on it and select "Export"
            </Block>
          </Section>

          <Section>
            <Title>Settings</Title>

            <Block>
              <label htmlFor="always-show">
                <input id="always-show" type="checkbox" checked={ true }/> Always show Mimic buttons
              </label>
            </Block>

            <Block>
              Hotkey to show and hide Mimic
              <Input type="text" value={ 'Alt + M' }/>
            </Block>

            <div>
              <label htmlFor="analytics">
                <input id="analytics" type="checkbox" checked={ false }/> Send anonymous usage stats
              </label>
            </div>
          </Section>

        </Container>
      </div>
    );
  }
}

export default UIStateListener(RequestLog);
