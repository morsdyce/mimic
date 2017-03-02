import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { InlineEditContainer, InlineEditInput } from 'ui/components/Mocks/Sidebar/styled';

class InlineEdit extends React.PureComponent {

  componentWillReceiveProps(nextProps) {
    const isEditing = this.props.renamedItemId === nextProps.id;

    if (isEditing) {
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
      this.onCancel();
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

  onCancel = () => {
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
            onBlur={ this.onCancel }
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
