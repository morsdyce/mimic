import React from 'react';
import styled from 'styled-components';
import merge from 'lodash/merge';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import map from 'lodash/map';
import SelectBar from 'ui/components/SelectBar';
import Select from 'ui/components/common/Select';
import Tabs from 'ui/components/common/Tabs';
import CodeEditor from 'ui/components/CodeEditor';
import stopwatchIcon from 'ui/assets/images/stopwatch@2x.png';

const Container = styled.div`
  flex-grow: 1;
`;

const SettingsBar = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    case !!contentType.match('application/json'):
      return 'JSON';

    case !!contentType.match('text/xml'):
      return 'XML';

    case !!contentType.match('text/html'):
      return 'HTML';

    case !!contentType.match('text/plain'):
      return 'Plain text';

    case !!contentType.match('multipart'):
      return 'File';

    default:
      return null;
  }
};

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedResponseContentTab: 'body'
    };

    this.selectResponseContentTab = this.selectResponseContentTab.bind(this);
    this.updateMock               = this.updateMock.bind(this);
    this.handleCodeEditorChange   = debounce(this.handleCodeEditorChange.bind(this), 500);
    this.handleUrlChange          = this.handleUrlChange.bind(this);
  }

  selectResponseContentTab(selectedResponseContentTab) {
    this.setState({ selectedResponseContentTab });
  }

  updateMock(partialUpdate) {
    const { API, selectedMock } = this.props;
    const mock                  = merge({ ...selectedMock }, { ...partialUpdate });

    API.updateMock(selectedMock.id, mock)
  }

  handleCodeEditorChange(value) {
    this.updateMock({ response: { body: value } });
  }

  handleUrlChange(url) {

  }

  render() {
    const { selectedMock } = this.props;

    if (!selectedMock) {
      return <div>Please select mock</div>;
    }

    const value = selectedMock.response.body;

    return (
      <Container>
        <SettingsBar>
          <SelectBar values={['GET', 'POST', 'PUT', 'DELETE']}
                     selectedValue={ selectedMock.method }/>

          <Input type="text" value={ selectedMock.url } onChange={ this.handleUrlChange }/>
        </SettingsBar>

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

        {
          this.state.selectedResponseContentTab !== 'headers' && (
            <CodeEditor
              key={ `${selectedMock.id}` }
              value={ value }
              onChange={ this.handleCodeEditorChange }
              contentType={ get(selectedMock, 'response.headers[content-type]') }/>
          )
        }

        {
          this.state.selectedResponseContentTab === 'headers' && (
            <div>
              {
                map(selectedMock.response.headers, (value, header) => (
                  <p key={ header }>{header}: {value}</p>
                ))
              }
            </div>
          )
        }

      </Container>
    );
  }
}

export default Editor;
