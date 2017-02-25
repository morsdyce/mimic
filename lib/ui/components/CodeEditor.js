import React from 'react';
import Frame from 'react-frame-component';
import styled from 'styled-components';
import { getContentType } from 'ui/utils/string';
import CSS from '!!raw-loader!codemirror/lib/codemirror.css';
import JSMode from '!!raw-loader!codemirror/mode/javascript/javascript';
import XMLMode from '!!raw-loader!codemirror/mode/xml/xml';
import JS from '!!raw-loader!codemirror';

const StyledFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: none;
`;

export class CodeEditor extends React.Component {

  constructor(props) {
    super(props);

    const scripts = JS + JSMode + XMLMode;
    const mode = getContentType(props.contentType);

    this.state = {
      initialContent: `<!DOCTYPE html><html>
      <head>
        <style>
          ${CSS}
          
          textarea {
            opacity: 0;
          }
        </style>
      </head>
      <body>
        <div></div>
        <script>${scripts}</script>
        <script>
           document.addEventListener("DOMContentLoaded", function(event) {
            
            setTimeout(function() {
              var textArea = document.querySelector('textarea');
              var cm = CodeMirror.fromTextArea(textArea, {
                lineNumbers: false,
                mode: '${mode}'
              });
        
              cm.on('change', function (editor, change) {
                  var value = cm.getValue();
                  
                  if (change.origin === 'paste') {
                    if (window.js_beautify) {
                      var cursorPosition = cm.getCursor();
                      var formattedValue = cm.getValue();
                      cm.setValue(formattedValue);
                      cm.setCursor(cursorPosition);
                    }
                  }
        
                  textArea.innerHTML = value;
                  textArea.value = value;
        
                  var event = new Event('input', { bubbles: true });
                  textArea.dispatchEvent(event);
                });
              });
              }, 0)
        </script>
      </body>
      </html>`
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value } = this.props;

    return (
      <StyledFrame className="editor-frame" initialContent={ this.state.initialContent }>
        <textarea onChange={ this.handleChange } defaultValue={ value } />
      </StyledFrame>
    );
  }
}

CodeEditor.propTypes = {
  contentType: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default CodeEditor;
