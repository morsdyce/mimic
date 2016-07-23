import React from 'react';
import ReactDOM from 'react-dom';
import Frame from 'react-frame-component';

import JSMode from '!!raw!codemirror/mode/javascript/javascript';
import JS from '!!raw!codemirror';
import CSS from '!!raw!codemirror/lib/codemirror.css';

export class Editor extends React.Component {

  render() {

    const {mode, onChange, value} = this.props;

    return (
      <Frame ref="iframe" className="editor-frame">
        <textarea ref="text" onChange={ this.changed.bind(this) } defaultValue={ value } />
      </Frame>
    );
  }

  componentDidMount() {
    const mode = this.props.mode === 'javascript' ? '{ name: "javascript", json: true }' : `"${this.props.mode}"`;
    const body = ReactDOM.findDOMNode(this.refs.iframe).contentWindow.document.body;
    const style = document.createElement('style');
    const script = document.createElement('script');
    const extra = `
      ;
      var textArea = document.body.children[0].children[0].children[0];
      var cm = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        mode: ${mode}
      });
      
      cm.on('change', function (cm) {
          textArea.innerHTML = cm.getValue();
          
          var event = new Event('input', { bubbles: true });
          textArea.dispatchEvent(event);
        });
    `;

    script.innerHTML = JS + JSMode + extra;
    style.innerHTML = CSS + `.CodeMirror { height: 100vh; }`;

    body.appendChild(style);
    body.appendChild(script);
  }

  changed(e) {
    this.props.onChange(this.refs.text.value);
  }
}
