import 'codemirror/lib/codemirror.css';

import React from 'react';
import CodeMirror from 'react-codemirror';
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
      <Frame ref="iframe">
        <textarea ref="text" onChange={ this.changed.bind(this) }>Hello</textarea>
      </Frame>
    );
  }

  componentDidMount() {
    console.log(`CODE MIRROW LOADING...`);

    const body = this.refs.iframe.getDOMNode().contentWindow.document.body;
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
    style.innerHTML = CSS;

    body.appendChild(style);
    body.appendChild(script);

    // debugger;
  }

  changed(e) {
    console.log(`AHA! ${ this.refs.text.value }`);
  }

  // return <CodeMirror value={ value } onChange={ onChange } options={ options }/>;

};

