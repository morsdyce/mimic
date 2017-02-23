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
import API from 'api';

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
  font-size: 13px;
  line-height: 20px;
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

  state = {
    selectedResponseContentTab: 'response body'
  };

  selectResponseContentTab = (selectedResponseContentTab) => {
    this.setState({ selectedResponseContentTab });
  };

  updateMock = (partialUpdate) => {
    const selectedMock = this.props.selectedMock;
    const mock         = merge({ ...selectedMock }, { ...partialUpdate });

    API.updateMock(selectedMock.id, mock)
  };

  handleCodeEditorChange = (value) => {
    this.updateMock({ response: { body: value } });
  };

  handleUrlChange = (url) => {

  };

  handleMethodChange = (method) => {
    this.updateMock({ method });

    if (method === 'GET' || method === 'DELETE') {
      this.setState({ selectedResponseContentTab: 'response body' });
      return;
    }

    this.forceUpdate();
  };

  getTabs() {
    const method = this.props.selectedMock.method;
    const tabs   = ['response headers', 'response body'];

    if (method === 'GET' || method === 'DELETE') {
      return tabs;
    }

    return ['request body', ...tabs];
  }

  render() {
    const { selectedMock }               = this.props;
    const { selectedResponseContentTab } = this.state;

    if (!selectedMock) {
      return null;
    }

    return (
      <Container>
        <SettingsBar>
          <SelectBar values={['GET', 'POST', 'PUT', 'DELETE']}
                     selectedValue={ selectedMock.method }
                     onChange={ this.handleMethodChange }/>

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
        </SettingsBar>

        <Tabs options={ this.getTabs() }
              selectTab={ this.selectResponseContentTab }
              selectedTab={ selectedResponseContentTab }/>

        {
          selectedResponseContentTab === 'request body' && (
            <CodeEditor
              key={ `${selectedMock.id}-${selectedResponseContentTab}` }
              value={ get(selectedMock, 'params') }
              onChange={ this.handleCodeEditorChange }
              contentType={ get(selectedMock, 'headers[Content-Type]') }/>
          )
        }

        {
          selectedResponseContentTab === 'response body' && (
            <CodeEditor
              key={ `${selectedMock.id}-${selectedResponseContentTab}` }
              value={ get(selectedMock, 'response.body') }
              onChange={ this.handleCodeEditorChange }
              contentType={ get(selectedMock, 'response.headers[content-type]') }/>
          )
        }

        {
          selectedResponseContentTab === 'response headers' && (
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
