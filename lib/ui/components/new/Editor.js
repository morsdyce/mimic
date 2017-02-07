import React from 'react';
import styled from 'styled-components';
import SelectBar from 'ui/components/new/SelectBar';
import Select from 'ui/components/new/common/Select';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';

const Container = styled.div`
  flex-grow: 1;
  min-width: 610px;
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

const contentTypeHeaderToString = (headers) => {
  if (!headers || !headers['content-type']) {
    return null;
  }

  const contentType = headers['content-type'];

  switch (true) {
    case contentType.match('application/json'):
      return 'JSON';

    case contentType.match('text/xml'):
      return 'XML';

    case contentType.match('text/html'):
      return 'HTML';

    case contentType.match('text/plain'):
      return 'Plain text';

    case contentType.match('multipart'):
      return 'File';

    default:
      return null;
  }
};

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { selectedMock } = this.props;

    if (!selectedMock) {
      return <div>Please select mock</div>;
    }

    return (
      <Container>
        Request | Response | Team Sync | Import & Export | Settings | Close

        <SettingsBar>
          <SelectBar values={[200, 201, 401, 500]}
                     other={ true }
                     selectedValue={ selectedMock.response.status }/>

          <SelectBar values={['JSON', 'XML', 'HTML', 'Plain text', 'File']}
                     selectedValue={ contentTypeHeaderToString(selectedMock.response.headers) }/>

          <Select
            valueIcon={ stopwatchIcon }
            value={ selectedMock.response.delay }
            options={ delayPreset.concat({ value: selectedMock.response.delay, label: selectedMock.response.delay + 'ms' }) }/>
        </SettingsBar>

        <SettingsBar>
          <SelectBar values={['GET', 'POST', 'PUT', 'DELETE']}
                     selectedValue={ selectedMock.method }/>

          <Input type="text" value={ selectedMock.url }/>
        </SettingsBar>

        <TextEditor>
          { JSON.stringify(selectedMock.response.body) }
        </TextEditor>
      </Container>
    );
  }
}

export default Editor;
