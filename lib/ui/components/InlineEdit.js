import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 13px;
  line-height: 20px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditInput = styled.input`
  display: block;
  width: 100%;
  background-color: inherit;
  font-size: inherit;
  line-height: inherit;
  outline: none;
  border: none;
  padding: 0;
`;

class InlineEdit extends React.Component {

  state = {
    editing: false
  };

  handleKeyDown = (e) => {
    const { onCancel, onSave } = this.props;

    switch (e.key) {
      case 'Enter':
        onSave && onSave(this.nameInput.base.value);
        this.toggleEditing();
        break;
      case 'Escape':
        this.toggleEditing();
        onCancel && onCancel();
        break;
    }
  };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing }, () => {
      if (this.state.editing) {
        this.nameInput.base.focus();
      }
    });
  };

  onCancel = () => {
    this.setState({ editing: false });
  };

  render() {
    return (
      <Container onDoubleClick={ this.toggleEditing }>
        { this.state.editing && (
          <EditInput
            type="text"
            ref={ input => this.nameInput = input }
            defaultValue={ this.props.defaultValue }
            onBlur={ this.onCancel }
            onKeyDown={ this.handleKeyDown }/>
        )}

        { !this.state.editing && this.props.children }
      </Container>
    );
  }

}

export default InlineEdit;
