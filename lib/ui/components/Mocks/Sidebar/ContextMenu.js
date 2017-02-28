import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash/omit';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import { downloadFile, copyToClipboard } from 'ui/utils/export';
import UIState, { UIStateListener } from 'ui/UIState';
import { selectFirstMock } from 'ui/utils/mocks';
import Icon from 'ui/components/common/Icon';
import { ContextMenuWrapper, ContextMenuItem, ContextMenuSeparator } from 'ui/components/Mocks/Sidebar/styled';

const iconStyle = {
  marginLeft: -24,
  cursor: 'pointer',
  marginRight: 6,
  verticalAlign: 'middle',
};

class ContextMenu extends React.Component {

  handleClickOutside() {
    this.closeMenu();
  }

  closeMenu = () => {
    UIState.update({
      mocksSidebarMenu: {
        visible: false,
        x: 0,
        y: 0
      }
    });
  };

  downloadAsFile = () => {
    const mockIds = UIState.selectedItems
      .filter((item) => item instanceof Mock)
      .map((mock) => mock.id);

    const groupIds = UIState.selectedItems
      .filter((item) => item instanceof Group)
      .map((group) => group.id);

    downloadFile('mocks.json', API.exportMocks(
      mockIds,
      groupIds,
      true
    ));
  };

  expandAllGroups = () => {
    UIState.expandAllGroups();
    this.closeMenu();
  };

  collapseAllGroups = () => {
    UIState.collapseAllGroups();
    this.closeMenu();
  };

  deleteSelected = () => {
    UIState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id)
      }
    });

    selectFirstMock();
    this.closeMenu();
  };

  renameSelected = () => {
    const item = UIState.selectedItems[0];

    this.closeMenu();

    if (item) {
      UIState.update({ sidebarRenameItemId: item.id });
    }
  };

  cloneSelected = () => {
    UIState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.duplicateMock(item.id)
      }

      if (item instanceof Group) {
        API.duplicateGroup(item.id)
      }
    });

    this.closeMenu();
  };

  recaptureMocks = () => {
    const mockIds = UIState.selectedItems
      .filter((item) => item instanceof Mock)
      .map((mock) => mock.id);

    UIState.update({ recaptureRequestIds: mockIds });
    API.recaptureMocks(mockIds, (finishedId) => {
      const recaptureRequestIds = UIState.recaptureRequestIds.filter((id) => id !== finishedId);
      UIState.update({ recaptureRequestIds });
    });

    this.closeMenu();
  };

  findRelated = () => {
    const mock = UIState.selectedItems[0];

    if (mock) {
      UIState.update({
        searchTerm: mock.url
      });
    }

    this.closeMenu();
  };

  copy = () => {
    const mockIds = UIState.selectedItems
      .filter((item) => item instanceof Mock)
      .map((mock) => mock.id);

    const groupIds = UIState.selectedItems
      .filter((item) => item instanceof Group)
      .map((group) => group.id);

    copyToClipboard(API.exportMocks(
      mockIds,
      groupIds,
      true
    ));

    UIState.update({
      clipboard: {
        command: 'copy',
        items: mockIds
      }
    });

    this.closeMenu();
  };

  cut = () => {
    const mockIds = UIState.selectedItems
      .filter((item) => item instanceof Mock)
      .map((mock) => mock.id);

    UIState.update({
      clipboard: {
        command: 'cut',
        items: mockIds
      }
    });

    this.closeMenu();
  };

  paste = () => {
    const group = UIState.selectedItems[0];

    if (group) {
      UIState.clipboard.items.forEach((mockId) => {
        const mock = API.getMock(mockId);

        if (mock) {
          if (UIState.clipboard.command === 'copy') {
            API.mockRequest({ ...omit(mock, ['id']), groupId: group.id })
          }

          if (UIState.clipboard.command === 'cut') {
            API.updateMock(mock.id, { ...mock, groupId: group.id });

            UIState.update({
              clipboard: {
                command: null,
                items: []
              }
            });
          }
        }
      });
    }

    this.closeMenu();
    UIState.triggerUpdates();
  };

  canPaste = () => {
    const item = UIState.selectedItems[0];

    return (
      UIState.selectedItems.length > 1
      || !(item instanceof Group)
      || UIState.clipboard.items.length === 0
    );
  };

  componentDidUpdate() {
    if (!this.contextMenu) {
      return;
    }

    const bottomMargin = window.innerHeight - UIState.mocksSidebarMenu.y;

    if (this.contextMenu.clientHeight > bottomMargin) {
      this.contextMenu.style.top = UIState.mocksSidebarMenu.y - this.contextMenu.clientHeight + 'px';
    }
  }

  render() {
    if (!UIState.mocksSidebarMenu.visible) {
      return null;
    }

    return (
      <ContextMenuWrapper style={{ top: UIState.mocksSidebarMenu.y, left: UIState.mocksSidebarMenu.x }}
                   innerRef={ (element) => this.contextMenu = element }>
        <ContextMenuItem onClick={ this.renameSelected } disabled={ UIState.selectedItems.length > 1 }>
          Rename (or doubleclick)
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.deleteSelected }>
          <Icon src="remove" style={ iconStyle }/>
          Delete
        </ContextMenuItem>

        <ContextMenuItem disabled={ UIState.selectedItems.length < 1 } onClick={ this.cut }>
          Cut
        </ContextMenuItem>

        <ContextMenuItem disabled={ UIState.selectedItems.length < 1 } onClick={ this.copy }>
          Copy
        </ContextMenuItem>

        <ContextMenuItem disabled={ this.canPaste() } onClick={ this.paste }>
          Paste
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.cloneSelected }>
          Duplicate
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.downloadAsFile }>
          Export to JSON
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.recaptureMocks }>
          <Icon src="record" style={ iconStyle }/>
          Re-capture from Server
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem disabled={ UIState.selectedItems.length > 1 } onClick={ this.findRelated }>
          <Icon src="search" style={ iconStyle }/>
          Find related
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.expandAllGroups }
                  disabled={ !UIState.groups.find((g) => !g.isOpen) }>
          Expand all
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.collapseAllGroups }
                  disabled={ !UIState.groups.find((g) => g.isOpen) }>
          Collapse all
        </ContextMenuItem>
      </ContextMenuWrapper>
    );
  }
}

export default UIStateListener(enhanceWithClickOutside(ContextMenu));
