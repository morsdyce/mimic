import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash/omit';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import { downloadFile, copyToClipboard } from 'ui/utils/export';
import MocksSidebarState from 'ui/states/MocksSidebarState';
import UIState  from 'ui/UIState';
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
    MocksSidebarState.closeMenu();
  }

  downloadAsFile = () => {
    const mockIds = MocksSidebarState.selectedMocks.map((mock) => mock.id);
    const groupIds = MocksSidebarState.selectedGroups.map((group) => group.id);

    downloadFile('mocks.json', API.exportMocks(mockIds, groupIds, true));
  };

  expandAllGroups = () => {
    MocksSidebarState.expandAllGroups();
    MocksSidebarState.closeMenu();
  };

  collapseAllGroups = () => {
    MocksSidebarState.collapseAllGroups();
    MocksSidebarState.closeMenu();
  };

  deleteSelected = () => {
    MocksSidebarState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id)
      }
    });

    MocksSidebarState.selectFirstMock();
    MocksSidebarState.closeMenu();
  };

  renameSelected = () => {
    const item = MocksSidebarState.selectedItems[0];

    MocksSidebarState.closeMenu();

    if (item) {
      UIState.update({ sidebarRenameItemId: item.id });
    }
  };

  cloneSelected = () => {
    MocksSidebarState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.duplicateMock(item.id)
      }

      if (item instanceof Group) {
        API.duplicateGroup(item.id)
      }
    });

    MocksSidebarState.closeMenu();
  };

  recaptureMocks = () => {
    const mockIds = MocksSidebarState.selectedMocks.map((mock) => mock.id);

    MocksSidebarState.recaptureMocks(mockIds);

    API.recaptureMocks(mockIds, (finishedId) => {
      const recaptureRequestIds = MocksSidebarState.recaptureRequestIds.filter((id) => id !== finishedId);

      MocksSidebarState.recaptureMocks(recaptureRequestIds);
    });

    MocksSidebarState.closeMenu();
  };

  findRelated = () => {
    const mock = MocksSidebarState.selectedItems[0];

    if (mock) {
      UIState.update({ searchTerm: mock.url });
    }

    MocksSidebarState.closeMenu();
  };

  copy = () => {
    const mockIds = MocksSidebarState.selectedMocks.map((mock) => mock.id);
    const groupIds = MocksSidebarState.selectedGroups.map((group) => group.id);

    copyToClipboard(API.exportMocks(mockIds, groupIds, true));

    MocksSidebarState.clipboardAction('copy', mockIds);
    MocksSidebarState.closeMenu();
  };

  cut = () => {
    const mockIds = MocksSidebarState.selectedMocks.map((mock) => mock.id);

    MocksSidebarState.clipboardAction('cut', mockIds);
    MocksSidebarState.closeMenu();
  };

  paste = () => {
    const group = MocksSidebarState.selectedItems[0];

    if (group) {
      MocksSidebarState.clipboard.items.forEach((mockId) => {
        const mock = API.getMock(mockId);

        if (mock) {
          if (MocksSidebarState.clipboard.command === 'copy') {
            API.mockRequest({ ...omit(mock, ['id']), groupId: group.id })
          }

          if (MocksSidebarState.clipboard.command === 'cut') {
            API.updateMock(mock.id, { ...mock, groupId: group.id });

            MocksSidebarState.clipboardAction(null, []);
          }
        }
      });
    }

    MocksSidebarState.closeMenu();
  };

  canPaste = () => {
    MocksSidebarState.canPaste();
  };

  componentDidUpdate() {
    if (!this.contextMenu) {
      return;
    }

    const bottomMargin = window.innerHeight - MocksSidebarState.contextMenu.y;

    if (this.contextMenu.clientHeight > bottomMargin) {
      this.contextMenu.style.top = MocksSidebarState.contextMenu.y - this.contextMenu.clientHeight + 'px';
    }
  }

  render() {
    if (!MocksSidebarState.contextMenu.visible) {
      return null;
    }

    return (
      <ContextMenuWrapper style={{ top: MocksSidebarState.contextMenu.y, left: MocksSidebarState.contextMenu.x }}
                          innerRef={ (element) => this.contextMenu = element }>
        <ContextMenuItem onClick={ this.renameSelected }
                         disabled={ MocksSidebarState.hasSelection }>
          Rename (or doubleclick)
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.deleteSelected }>
          <Icon src="remove" style={ iconStyle }/>
          Delete
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.cut }
                         disabled={ !MocksSidebarState.hasSelection } >
          Cut
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.copy }
                         disabled={ !MocksSidebarState.hasSelection } >
          Copy
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.paste }
                         disabled={ this.canPaste() } >
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

        <ContextMenuItem onClick={ this.findRelated }
                         disabled={ MocksSidebarState.hasSelection } >
          <Icon src="search" style={ iconStyle }/>
          Find related
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.expandAllGroups }
                         disabled={ !MocksSidebarState.groups.find((g) => !g.isOpen) }>
          Expand all
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.collapseAllGroups }
                         disabled={ !MocksSidebarState.groups.find((g) => g.isOpen) }>
          Collapse all
        </ContextMenuItem>
      </ContextMenuWrapper>
    );
  }
}

export default enhanceWithClickOutside(ContextMenu);
