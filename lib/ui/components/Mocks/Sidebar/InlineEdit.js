import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { InlineEditContainer, InlineEditInput } from 'ui/components/Mocks/Sidebar/styled';

class InlineEdit extends React.Component {

  componentWillReceiveProps(nextProps) {
    const wasEditing = this.props.id === this.props.renamedItemId;
    const isEditing = this.props.id === nextProps.renamedItemId;

    console.log(this.props.id, this.props.renamedItemId, { wasEditing, isEditing });

    if (isEditing && !wasEditing) {
      setTimeout(() => {
        if (this.nameInput) {
          this.nameInput.select();
        }
      }, 0);
    }
  }

  handleClickOutside = () => {
    const isEditing = this.props.renamedItemId === this.props.id;

    if (isEditing) {
      this.onBlur();
    }
  };

  handleKeyDown = (event) => {
    const { onCancel, onSave } = this.props;

    switch (event.key) {
      case 'Enter':
        onSave && onSave(this.nameInput.value);
        this.toggleEditing();
        break;
      case 'Escape':
        event.stopPropagation();
        this.toggleEditing();
        onCancel && onCancel();
        break;
    }
  };

  toggleEditing = () => {
    const isEditing = this.props.renamedItemId === this.props.id;

    if (isEditing) {
      this.props.editItemName(null);
      return;
    }

    this.props.editItemName(this.props.id);

    setTimeout(() => this.nameInput.select(), 0);
  };

  onBlur = () => {
    this.props.onSave && this.props.onSave(this.nameInput.value);
    this.props.editItemName(null);
  };

  render() {
    const isEditing = this.props.renamedItemId === this.props.id;

    return (
      <InlineEditContainer onDoubleClick={ this.toggleEditing }>
        { isEditing && (
          <InlineEditInput
            type="text"
            innerRef={ (input) => { this.nameInput = input; } }
            defaultValue={ this.props.defaultValue }
            onBlur={ this.onBlur }
            onKeyUp={ this.handleKeyDown }/>
        )}

        { !isEditing && this.props.children }
      </InlineEditContainer>
    );
  }
}

InlineEdit.propTypes = {
  renamedItemId: React.PropTypes.string,
  editItemName: React.PropTypes.func.isRequired
};

export default enhanceWithClickOutside(InlineEdit);
