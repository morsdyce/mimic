import React from 'react';
import styled from 'styled-components';
import SelectBar from 'ui/components/new/SelectBar';
import Select from 'ui/components/new/common/Select';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';

const Container = styled.div`
  flex-grow: 1;
`;

const SettingsBar = styled.div`
  border-top: 1px solid #f0f0f0;
  padding: 6px;
  display: flex;
  align-items: center;
`;

const TextEditor = styled.div`
  border-top: 1px solid #f0f0f0;
  padding: 6px;
`;

const Input = styled.input`
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex-grow: 1;
  height: 22px;
  outline: 0;
  font-size: 14px;
  padding: 0 6px;
`;

const delayPreset = [
  { value: 500, label: '0.5s' },
  { value: 1000, label: '1s' },
  { value: 2000, label: '2s' },
  { value: 5000, label: '5s' }
];

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <Container>
        Request | Response | Team Sync | Import & Export | Settings | Close

        <SettingsBar>
          <SelectBar values={[200, 201, 401, 500]} other={ true } selectedValue={ 200 }/>
          <SelectBar values={['JSON', 'XML', 'HTML', 'Plain text', 'File']} selectedValue="JSON"/>

          <Select
            valueIcon={ stopwatchIcon }
            value={ 500 }
            options={ delayPreset }/>
        </SettingsBar>

        <SettingsBar>
          <SelectBar values={['GET', 'POST', 'PUT', 'DELETE']} selectedValue="POST"/>

          <Input type="text"/>
        </SettingsBar>

        <TextEditor>
          status: saved;
          id: 542
        </TextEditor>
      </Container>
    );
  }
}

export default Editor;
