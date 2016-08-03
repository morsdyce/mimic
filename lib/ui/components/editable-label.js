import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';


export class EditableLabel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: props.text
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ text: props.text });
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    });
  }

  onChange(event) {
    this.setState({ text: event.target.value });
  }

  done(e) {
    if (e.keyCode !== 13) {
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(this.state.text);
    }

    this.toggleEditing();
  }

  cancel() {
    this.state.text = this.props.text;
    this.toggleEditing();
  }

  render() {
    const label = (
      <span>
      <span onClick={ this.toggleEditing.bind(this) }>{ this.state.text }</span>
      <IconButton onClick={ this.toggleEditing.bind(this) }
                  tooltip="Edit" style={{ width: '32px', height: '32px' }}
                  iconStyle={{ fontSize: 40, width: '20px', height: '20px'}}>
        <EditIcon />
      </IconButton>
    </span>
    );

    const textField = (
      <div style={{ display: 'inline'}}>
      <TextField name="scenario"
                 value={ this.state.text }
                 onChange={ this.onChange.bind(this) }
                 underlineShow={ false }
                 onKeyDown={ this.done.bind(this) }
                 style={{ margin: '0 10px', width: '73%', fontSize: '1em', border: '1px solid #C1BEBE', padding: '0 5px' }}/>
      <RaisedButton className="editable-label-button" label="Done" primary={ true } onClick={ this.done.bind(this) } style={{ margin: '0 10px', position: 'relative', bottom: '5px' }}/>
      <RaisedButton className="editable-label-button" label="Cancel" secondary={ true } onClick={ this.cancel.bind(this) } style={{ margin: '0 10px', position: 'relative', bottom: '5px' }}/>
      </div>
    );

    return this.state.editing ? textField : label;
  }

}
