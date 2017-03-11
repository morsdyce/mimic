import React from 'react';
import styled from 'styled-components';
import merge from 'lodash/merge';
import get from 'lodash/get';
import SegmentedSelect from 'ui/components/common/SegmentedSelect';
import Select from 'ui/components/common/Select';
import Tabs from 'ui/components/Mocks/Tabs';
import CodeEditor from 'ui/components/Mocks/CodeEditor';
import Icon from 'ui/components/common/Icon';
import API from 'api';
import find from 'lodash/find';
import includes from 'lodash/includes';
import { getContentType } from 'api/utils/headers';
import { convertDelayToSeconds } from 'ui/utils/string';
import HeadersEditor from 'ui/components/Mocks/HeadersEditor';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EditorSettingsBar = styled(Div)`
  padding: 4px;
  display: flex;
  align-items: center;
`;

const URLInput = styled.input`
  border: none;
  background-color: #f0f0f0;
  border-radius: 4px;
  flex: 1;
  height: 24px;
  outline: 0;
  font-size: 13px;
  line-height: 20px;
  padding: 0 6px;
  
  &:focus {
    box-sizing: border-box;
    border: 2px solid #b2c9ee;
    padding: 0 4px;
  }
`;

const EditorContainer = styled(Div)`
  flex: 1;
  padding-left: 5px;
`;

const CenteredText = styled(Div)`
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-left: 25px;
`;

const delayPreset = [
  { value: 500, label: '0.5s' },
  { value: 1000, label: '1s' },
  { value: 2000, label: '2s' },
  { value: 5000, label: '5s' },
  { value: 10000, label: '10s' },
  { value: 15000, label: '15s' }
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

const httpStatusCodes = [200, 201, 401, 500];

class Editor extends React.Component {

  state = {
    selectedResponseContentTab: 'response body'
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedMock && this.props.selectedMock.id !== nextProps.selectedMock.id) {
      this.setState({ selectedResponseContentTab: 'response body' });
    }
  }

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

  handleUrlChange = (event) => {
    this.updateMock({ url: event.target.value.trim() });
  };

  handleMethodChange = (method) => {
    this.updateMock({ method });

    if (method === 'GET' || method === 'DELETE') {
      this.setState({ selectedResponseContentTab: 'response body' });
      return;
    }

    this.forceUpdate();
  };

  handleResponseChange = (status) => {
    this.updateMock({
      response: { ...this.props.selectedMock.response, status }
    });

    this.forceUpdate();
  };

  handleContentTypeChange = (value) => {
    this.updateMock({
      response: {
        headers: {
          'content-type': getContentType(value)
        }
      }
    });

    this.forceUpdate();
  };

  handleDelayChange = (delay) => {
    this.updateMock({
      response: {
        delay
      }
    });

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

  renderEditor() {
    const { selectedMock }               = this.props;
    const { selectedResponseContentTab } = this.state;
    const contentType = contentTypeHeaderToString(selectedMock.response.headers);

    return (
      <EditorContainer>
        {
          selectedResponseContentTab === 'request body' &&
          <CodeEditor
            key={ `${selectedMock.id}-${selectedResponseContentTab}-${contentType}` }
            value={ get(selectedMock, 'params') }
            onChange={ this.handleCodeEditorChange }
            contentType={ get(selectedMock, 'headers[content-type]') }/>
        }

        {
          selectedResponseContentTab === 'response body' &&
          <CodeEditor
            key={ `${selectedMock.id}-${selectedResponseContentTab}-${contentType}` }
            value={ get(selectedMock, 'response.body') }
            onChange={ this.handleCodeEditorChange }
            contentType={ get(selectedMock, 'response.headers[content-type]') }/>
        }

        { selectedResponseContentTab === 'response headers' && <HeadersEditor headers={ selectedMock.response.headers } selectedMock={ selectedMock }/> }
      </EditorContainer>
    )
  }

  renderRecapture() {
    return (
      <CenteredText>
        <Icon src="spin"/> &nbsp; Recapturing Request
      </CenteredText>
    )
  }

  render() {
    const { selectedMock } = this.props;
    const { selectedResponseContentTab } = this.state;

    if (!selectedMock) {
      return null;
    }

    const delayInPreset = find(delayPreset, { value: selectedMock.response.delay });

    let delayOptions = delayPreset;
    if (!delayInPreset) {
      delayOptions = [...delayOptions, {
        value: selectedMock.response.delay,
        label: convertDelayToSeconds(selectedMock.response.delay)
      }];
    }

    return (
      <Container>
        <EditorSettingsBar>
          <SegmentedSelect values={['GET', 'POST', 'PUT', 'DELETE']}
                           selectedValue={ selectedMock.method }
                           onChange={ this.handleMethodChange }/>

          <URLInput type="text" defaultValue={ selectedMock.url } onBlur={ this.handleUrlChange }/>
        </EditorSettingsBar>

        <EditorSettingsBar>
          <SegmentedSelect values={ httpStatusCodes }
                     other={ true }
                     selectedValue={ selectedMock.response.status }
                     onChange={ this.handleResponseChange }/>

          <SegmentedSelect values={['JSON', 'XML', 'HTML', 'Plain text']}
                           selectedValue={ contentTypeHeaderToString(selectedMock.response.headers) }
                           onChange={ this.handleContentTypeChange }/>

          <Select
            valueIcon="delay"
            value={ selectedMock.response.delay }
            onChange={ this.handleDelayChange }
            options={ delayOptions }/>
        </EditorSettingsBar>

        <Tabs options={ this.getTabs() }
              selectTab={ this.selectResponseContentTab }
              selectedTab={ selectedResponseContentTab }/>

        { includes(this.props.recaptureRequestIds, selectedMock.id) ? this.renderRecapture() : this.renderEditor() }
      </Container>
    );
  }
}

Editor.propTypes = {
  recaptureRequestIds: React.PropTypes.array.isRequired
};

export default Editor;
