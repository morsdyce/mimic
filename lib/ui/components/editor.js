import React from 'react';
import ReactDOM from 'react-dom';
import 'codemirror/mode/javascript/javascript';
import Frame from 'react-frame-component';

import JS from '!!raw!codemirror';
import CSS from '!!raw!codemirror/lib/codemirror.css';

export class Editor extends React.Component {

  render() {

    const {mode, onChange, value} = this.props;

    const options = {
      lineNumbers: true,
      mode
    };

    return (
      <Frame ref="iframe" className="editor-frame">
        <textarea ref="text" onChange={ this.changed.bind(this) } defaultValue={ value } />
      </Frame>
    );
  }

  componentDidMount() {
    console.log(`CODE MIRROR LOADING...`);

    const body = ReactDOM.findDOMNode(this.refs.iframe).contentWindow.document.body;
    const style = document.createElement('style');
    const script = document.createElement('script');
    const extra = `
      ;
      console.log("Running inside inseption!");
      var textArea = document.body.children[0].children[0].children[0];
      var cm = CodeMirror.fromTextArea(textArea, {
        lineNumbers: true,
        mode: "htmlmixed"
      });
      
      cm.on('change', function (cm) {
          console.log("Update text area with " + cm.getValue());
          textArea.innerHTML = cm.getValue();
          
          var event = new Event('input', { bubbles: true });
          textArea.dispatchEvent(event);
        });
      
    `;

    script.innerHTML = JS + extra;
    style.innerHTML = CSS + `.CodeMirror { height: 100vh; }`;

    body.appendChild(style);
    body.appendChild(script);
  }

  changed(e) {
    this.props.onChange(this.refs.text.value);
  }
}
