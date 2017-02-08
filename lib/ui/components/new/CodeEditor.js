import 'codemirror/mode/javascript/javascript';
import codeMirrorStyles from 'codemirror/lib/codemirror.css';
import React from 'react';
import CodeMirror from 'react-codemirror';
import Frame from 'react-frame-component';
import styled from 'styled-components';

const initialContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      ${codeMirrorStyles.toString()}
    </style>    
  </head>
  <body>
    <div></div>
  </body>
</html>
`;

const StyledFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: none;
  border-top: 1px solid #f0f0f0;
`;

export class CodeEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(value) {
    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const options = {
      lineNumbers: false,
      mode: 'javascript'
    };

    return (
      <StyledFrame initialContent={ initialContent }>
        <CodeMirror value={ this.state.value } onChange={ this.handleChange } options={ options } />
      </StyledFrame>

    );
  }
}

CodeEditor.propTypes = {

};

export default CodeEditor;
