import React from 'react';
import ReactDOM from 'react-dom';
import Frame from 'react-frame-component';

import JSMode from '!!raw!codemirror/mode/javascript/javascript';
import JS from '!!raw!codemirror';
import CSS from '!!raw!codemirror/lib/codemirror.css';
import JSBeautify from 'js-beautify';
import JSBeautifyCode from '!!raw!js-beautify/js/lib/beautify';

export class Editor extends React.Component {

  constructor(props) {
    super(props);

    const scripts = JS + JSBeautifyCode + JSMode;
    const styles = CSS + `.CodeMirror { height: 100vh; }`;
    const mode = this.props.mode === 'javascript' ? '{ name: "javascript", json: true }' : `"${this.props.mode}"`;

    this.state = {
      initialContent: `<!DOCTYPE html><html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        <div></div>
        <script>${scripts}</script>
        <script>
           document.addEventListener("DOMContentLoaded", function(event) {
            
            setTimeout(function() {
              var textArea = document.querySelector('textarea');
              var cm = CodeMirror.fromTextArea(textArea, {
                lineNumbers: true,
                mode: ${mode}
              });
        
              cm.on('change', function (editor, change) {
                  var value = cm.getValue();
        
                  if (change.origin === 'paste') {
                    if (window.js_beautify) {
                      var cursorPosition = cm.getCursor();
                      var formattedValue = window.js_beautify(cm.getValue(), { 'indent_size': 2 });
                      cm.setValue(formattedValue);
                      cm.setCursor(cursorPosition);
                    }
                  }
        
                  textArea.innerHTML = value;
        
                  var event = new Event('input', { bubbles: true });
                  textArea.dispatchEvent(event);
                });
              });
              }, 0)
        </script>
      </body>
      </html>`
    }
  }

  render() {
    const { value } = this.props;

    return (
      <Frame ref="iframe" className="editor-frame" initialContent={ this.state.initialContent }>
        <textarea ref="text" onChange={ this.changed.bind(this) } defaultValue={ JSBeautify.js(value || '', { 'indent_size': 2}) } />
      </Frame>
    );
  }

  changed(e) {
    this.props.onChange(this.refs.text.value);
  }
}
