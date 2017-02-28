import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import UIState, { UIStateListener } from 'ui/UIState';
import { InlineEditContainer, InlineEditInput } from 'ui/components/Mocks/Sidebar/styled';

class InlineEdit extends React.Component {

  componentWillReceiveProps(nextProps) {
    const isEditing = UIState.sidebarRenameItemId === nextProps.id;

    if (isEditing) {
      setTimeout(() => {
        if (this.nameInput) {
          this.nameInput.select();
        }
      }, 0);
    }
  }

  handleClickOutside = () => {
    const isEditing = UIState.sidebarRenameItemId === this.props.id;

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
    const isEditing = UIState.sidebarRenameItemId === this.props.id;

    if (isEditing) {
      UIState.update({ sidebarRenameItemId: null });
      return;
    }

    UIState.update({ sidebarRenameItemId: this.props.id });

    setTimeout(() => this.nameInput.select(), 0);
  };

  onCancel = () => {
    UIState.update({ sidebarRenameItemId: null });
  };

  render() {
    const isEditing = UIState.sidebarRenameItemId === this.props.id;

    return (
      <InlineEditContainer onDoubleClick={ this.toggleEditing } innerRef={ (node) => { this.container = node; }}>
        { isEditing && (
          <InlineEditInput
            type="text"
            innerRef={ input => this.nameInput = input }
            defaultValue={ this.props.defaultValue }
            onBlur={ this.onCancel }
            onKeyUp={ this.handleKeyDown }/>
        )}

        { !isEditing && this.props.children }
      </InlineEditContainer>
    );
  }

}

export default UIStateListener(enhanceWithClickOutside(InlineEdit));
