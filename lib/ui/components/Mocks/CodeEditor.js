import PropTypes from 'prop-types';
import React from 'react';
import Frame from 'react-frame-component';
import styled from 'styled-components';
import get from 'lodash/get';
import MocksState from 'ui/states/MocksState';
import { getContentType } from 'ui/utils/string';
import CSS from '!!raw-loader!codemirror/lib/codemirror.css';
import JSMode from '!!raw-loader!codemirror/mode/javascript/javascript';
import XMLMode from '!!raw-loader!codemirror/mode/xml/xml';
import JS from '!!raw-loader!codemirror';
import JSBeautify from 'js-beautify';

const StyledFrame = styled(Frame)`
  width: calc(100% - 5px);
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
          
          .CodeMirror {
            height: 100%;
          }
          
          html, body, body > div, .frame-content {
            height: 100%;
          }
          
          textarea {
            opacity: 0;
          }
        </style>
      </head>
      <body style="margin: 0;">
        <div></div>
        <script>${scripts}</script>
        <script>
     
           function reportClick(event) {
             parent.postMessage({ type: 'MIMIC_IFRAME' }, document.location.href);
           }
           
           document.addEventListener('click', reportClick);
           document.addEventListener('contextmenu', reportClick);
        
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

  componentDidMount() {
    window.addEventListener('message', this.onFrameClick);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onFrameClick);
  }

  onFrameClick = (message) => {
    if (get(message, 'data.type') === 'MIMIC_IFRAME') {
      MocksState.closeMenu();
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  };

  getValue() {
    const mode = getContentType(this.props.contentType) || '';

    if (mode.indexOf('json') !== -1) {
      return JSBeautify.js(this.props.value || '', { 'indent_size': 2 });
    }

    return this.props.value;
  }

  render() {
    return (
      <StyledFrame className="editor-frame" initialContent={ this.state.initialContent }>
        <textarea onChange={ this.handleChange } defaultValue={ this.getValue() } />
      </StyledFrame>
    );
  }
}

CodeEditor.propTypes = {
  contentType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CodeEditor;
