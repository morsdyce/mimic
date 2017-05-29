import PropTypes from 'prop-types';
import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash/omit';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import { downloadFile, copyToClipboard } from 'ui/utils/export';
import Icon from 'ui/components/common/Icon';
import MocksState from 'ui/states/MocksState';
import { ContextMenuWrapper, ContextMenuItem, ContextMenuSeparator } from 'ui/components/Mocks/Sidebar/styled';
import { connectToState } from 'ui/states/connector';

const CONTEXT_MENU_HEIGHT = 336;

const iconStyle = {
  marginLeft: -24,
  cursor: 'pointer',
  marginRight: 6,
  verticalAlign: 'middle',
};

class ContextMenu extends React.PureComponent {

  handleClickOutside() {
    this.props.closeMenu();
  }

  downloadAsFile = () => {
    const filename = MocksState.selectedItems.pop().name || 'mock.json' ;
    const mockIds  = this.props.selectedMocks.map((mock) => mock.id);
    const groupIds = this.props.selectedGroups.map((group) => group.id);

    downloadFile(filename, API.exportMocks(mockIds, groupIds, true));
  };

  expandAllGroups = () => {
    this.props.expandAllGroups();
    this.props.closeMenu();
  };

  collapseAllGroups = () => {
    this.props.collapseAllGroups();
    this.props.closeMenu();
  };

  deleteSelected = () => {
    this.props.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id)
      }
    });

    this.props.selectFirstMock();
    this.props.closeMenu();
  };

  renameSelected = () => {
    const item = this.props.selectedItems[0];

    this.props.closeMenu();

    if (item) {
      this.props.editItemName(item.id);
    }
  };

  cloneSelected = () => {
    this.props.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.duplicateMock(item.id)
      }

      if (item instanceof Group) {
        API.duplicateGroup(item.id)
      }
    });

    this.props.closeMenu();
  };

  recaptureMocks = () => {
    const mockIds = this.props.selectedMocks.map((mock) => mock.id);

    this.props.recaptureMocks(mockIds);

    API.recaptureMocks(mockIds, (finishedId) => {
      const recaptureRequestIds = this.props.recaptureRequestIds.filter((id) => id !== finishedId);

      this.props.recaptureMocks(recaptureRequestIds);
    });

    this.props.closeMenu();
  };

  findRelated = () => {
    const mock = this.props.selectedItems[0];

    if (mock) {
      this.props.updateQuery(mock.url);
    }

    this.props.closeMenu();
  };

  copy = () => {
    const mockIds  = this.props.selectedMocks.map((mock) => mock.id);
    const groupIds = this.props.selectedGroups.map((group) => group.id);

    copyToClipboard(API.exportMocks(mockIds, groupIds, true));

    this.props.clipboardAction('copy', mockIds);
    this.props.closeMenu();
  };

  cut = () => {
    const mockIds = this.props.selectedMocks.map((mock) => mock.id);

    this.props.clipboardAction('cut', mockIds);
    this.props.closeMenu();
  };

  paste = () => {
    const group = this.props.selectedItems[0];

    if (group) {
      this.props.clipboard.items.forEach((mockId) => {
        const mock = API.getMock(mockId);

        if (mock) {
          if (this.props.clipboard.command === 'copy') {
            API.mockRequest({ ...omit(mock, ['id']), groupId: group.id })
          }

          if (this.props.clipboard.command === 'cut') {
            API.updateMock(mock.id, { ...mock, groupId: group.id });

            this.props.clipboardAction(null, []);
          }
        }
      });
    }

    this.props.closeMenu();
  };

  canPaste = () => {
    return !this.props.canPaste();
  };

  render() {
    if (!this.props.contextMenu.visible) {
      return null;
    }

    const bottomMargin = window.innerHeight - this.props.contextMenu.y;
    const topMargin = CONTEXT_MENU_HEIGHT > bottomMargin
      ? this.props.contextMenu.y - CONTEXT_MENU_HEIGHT
      : this.props.contextMenu.y;

    const style = {
      top: topMargin,
      left: this.props.contextMenu.x
    };

    return (
      <ContextMenuWrapper style={ style } innerRef={ (element) => this.contextMenu = element }>
        <ContextMenuItem onClick={ this.renameSelected }
                         disabled={ this.props.hasMultipleSelection || !this.props.hasSelection }>
          Rename (or doubleclick)
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.deleteSelected }
                         disabled={ !this.props.hasSelection }>
          <Icon src="remove" style={ iconStyle }/>
          Delete
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.cut }
                         disabled={ !this.props.hasSelection }>
          Cut
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.copy }
                         disabled={ !this.props.hasSelection }>
          Copy
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.paste }
                         disabled={ this.canPaste() }>
          Paste
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.cloneSelected }
                         disabled={ !this.props.hasSelection }>
          Duplicate
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.downloadAsFile }
                         disabled={ !this.props.hasSelection }>
          Export to JSON
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.recaptureMocks }
                         disabled={ !this.props.hasSelection }>
          <Icon src="record" style={ iconStyle }/>
          Re-capture from Server
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.findRelated }
                         disabled={ this.props.hasMultipleSelection || !this.props.hasSelection }>
          <Icon src="search" style={ iconStyle }/>
          Find related
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.expandAllGroups }
                         disabled={ !this.props.groups.find((g) => !g.isOpen) }>
          Expand all
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.collapseAllGroups }
                         disabled={ !this.props.groups.find((g) => g.isOpen) }>
          Collapse all
        </ContextMenuItem>
      </ContextMenuWrapper>
    );
  }
}

ContextMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  selectedMocks: PropTypes.array.isRequired,
  selectedGroups: PropTypes.array.isRequired,
  expandAllGroups: PropTypes.func.isRequired,
  collapseAllGroups: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  selectFirstMock: PropTypes.func.isRequired,
  renameItemId: PropTypes.string,
  recaptureMocks: PropTypes.func.isRequired,
  recaptureRequestIds: PropTypes.array.isRequired,
  updateQuery: PropTypes.func.isRequired,
  clipboardAction: PropTypes.func.isRequired,
  clipboard: PropTypes.shape({
    command: PropTypes.string,
    items: PropTypes.array.isRequired
  }),
  contextMenu: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  hasSelection: PropTypes.bool.isRequired,
  hasMultipleSelection: PropTypes.bool.isRequired,
  groups: PropTypes.array.isRequired,
  canPaste: PropTypes.func.isRequired,
  editItemName: PropTypes.func.isRequired
};

export default connectToState(MocksState, enhanceWithClickOutside(ContextMenu));
