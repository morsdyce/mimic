import React from 'react';
import styled from 'styled-components';
import SelectBar from 'ui/components/new/SelectBar';
import Select from 'ui/components/new/common/Select';
import Tabs from 'ui/components/new/common/Tabs';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';
import closeIcon from 'ui/assets/images/close@2x.png';
import settingsIcon from 'ui/assets/images/settings.svg';

const Container = styled.div`
  flex-grow: 1;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`;

const SettingsBar = styled.div`
  border-top: 1px solid #f0f0f0;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextEditor = styled.div`
  border-top: 1px solid #f0f0f0;
  padding: 6px;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  align-self: center;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex-grow: 1;
  height: 24px;
  outline: 0;
  font-size: 14px;
  padding: 0 6px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const TeamSync = styled.div`
`;

const ImportExport = styled.div`
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
      selectedTab: 'response',
      selectedResponseContentTab: 'body'
    };

    this.selectTab                = this.selectTab.bind(this);
    this.selectResponseContentTab = this.selectResponseContentTab.bind(this);
  }

  selectTab(selectedTab) {
    this.setState({ selectedTab });
  }

  selectResponseContentTab(selectedResponseContentTab) {
    this.setState({ selectedResponseContentTab });
  }

  render() {
    const { selectedMock } = this.props;

    if (!selectedMock) {
      return <div>Please select mock</div>;
    }

    return (
      <Container>
        <Controls>
          <Tabs options={ ['request', 'response'] }
                selectedTab={ this.state.selectedTab }
                selectTab={ this.selectTab }/>

          <Actions>
            <TeamSync>
              Team Sync
            </TeamSync>

            <ImportExport>
              Import & Export
            </ImportExport>

            <Icon src={ settingsIcon } alt="Settings"/>
            <Icon src={ closeIcon } alt="Close" onClick={ this.props.onClose }/>
          </Actions>
        </Controls>

        {
          this.state.selectedTab === 'response' &&
          <SettingsBar>
            <Actions>
              <SelectBar values={[200, 201, 401, 500]}
                         other={ true }
                         selectedValue={ selectedMock.response.status }/>

              <SelectBar values={['JSON', 'XML', 'HTML', 'Plain text', 'File']}
                         selectedValue={ contentTypeHeaderToString(selectedMock.response.headers) }/>

              <Select
                valueIcon={ stopwatchIcon }
                value={ selectedMock.response.delay }
                options={ delayPreset.concat({
                  value: selectedMock.response.delay,
                  label: selectedMock.response.delay + 'ms'
                }) }/>
            </Actions>

            <Tabs options={ ['headers', 'body'] }
                  selectTab={ this.selectResponseContentTab }
                  selectedTab={ this.state.selectedResponseContentTab }/>
          </SettingsBar>
        }

        {
          this.state.selectedTab === 'request' &&
          <SettingsBar>
            <SelectBar values={['GET', 'POST', 'PUT', 'DELETE']}
                       selectedValue={ selectedMock.method }/>

            <Input type="text" value={ selectedMock.url }/>
          </SettingsBar>
        }

        <TextEditor>
          { this.state.selectedTab === 'request' &&
            JSON.stringify(selectedMock.params) }

          { this.state.selectedTab === 'response' &&
            this.state.selectedResponseContentTab === 'body' &&
            JSON.stringify(selectedMock.response.body) }

          { this.state.selectedTab === 'response' &&
            this.state.selectedResponseContentTab === 'headers' &&
            JSON.stringify(selectedMock.response.headers) }
        </TextEditor>
      </Container>
    );
  }
}

export default Editor;
