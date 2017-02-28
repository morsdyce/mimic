import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash/omit';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import { downloadFile, copyToClipboard } from 'ui/utils/export';
import MocksState from 'ui/states/MocksState';
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
    MocksState.closeMenu();
  }

  downloadAsFile = () => {
    const mockIds = MocksState.selectedMocks.map((mock) => mock.id);
    const groupIds = MocksState.selectedGroups.map((group) => group.id);

    downloadFile('mocks.json', API.exportMocks(mockIds, groupIds, true));
  };

  expandAllGroups = () => {
    MocksState.expandAllGroups();
    MocksState.closeMenu();
  };

  collapseAllGroups = () => {
    MocksState.collapseAllGroups();
    MocksState.closeMenu();
  };

  deleteSelected = () => {
    MocksState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id)
      }
    });

    MocksState.selectFirstMock();
    MocksState.closeMenu();
  };

  renameSelected = () => {
    const item = MocksState.selectedItems[0];

    MocksState.closeMenu();

    if (item) {
      MocksState.renamedItemId(item.id);
    }
  };

  cloneSelected = () => {
    MocksState.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.duplicateMock(item.id)
      }

      if (item instanceof Group) {
        API.duplicateGroup(item.id)
      }
    });

    MocksState.closeMenu();
  };

  recaptureMocks = () => {
    const mockIds = MocksState.selectedMocks.map((mock) => mock.id);

    MocksState.recaptureMocks(mockIds);

    API.recaptureMocks(mockIds, (finishedId) => {
      const recaptureRequestIds = MocksState.recaptureRequestIds.filter((id) => id !== finishedId);

      MocksState.recaptureMocks(recaptureRequestIds);
    });

    MocksState.closeMenu();
  };

  findRelated = () => {
    const mock = MocksState.selectedItems[0];

    if (mock) {
      MocksState.updateQuery(mock.url);
    }

    MocksState.closeMenu();
  };

  copy = () => {
    const mockIds = MocksState.selectedMocks.map((mock) => mock.id);
    const groupIds = MocksState.selectedGroups.map((group) => group.id);

    copyToClipboard(API.exportMocks(mockIds, groupIds, true));

    MocksState.clipboardAction('copy', mockIds);
    MocksState.closeMenu();
  };

  cut = () => {
    const mockIds = MocksState.selectedMocks.map((mock) => mock.id);

    MocksState.clipboardAction('cut', mockIds);
    MocksState.closeMenu();
  };

  paste = () => {
    const group = MocksState.selectedItems[0];

    if (group) {
      MocksState.clipboard.items.forEach((mockId) => {
        const mock = API.getMock(mockId);

        if (mock) {
          if (MocksState.clipboard.command === 'copy') {
            API.mockRequest({ ...omit(mock, ['id']), groupId: group.id })
          }

          if (MocksState.clipboard.command === 'cut') {
            API.updateMock(mock.id, { ...mock, groupId: group.id });

            MocksState.clipboardAction(null, []);
          }
        }
      });
    }

    MocksState.closeMenu();
  };

  canPaste = () => {
    MocksState.canPaste();
  };

  componentDidUpdate() {
    if (!this.contextMenu) {
      return;
    }

    const bottomMargin = window.innerHeight - MocksState.contextMenu.y;

    if (this.contextMenu.clientHeight > bottomMargin) {
      this.contextMenu.style.top = MocksState.contextMenu.y - this.contextMenu.clientHeight + 'px';
    }
  }

  render() {
    if (!MocksState.contextMenu.visible) {
      return null;
    }

    return (
      <ContextMenuWrapper style={{ top: MocksState.contextMenu.y, left: MocksState.contextMenu.x }}
                          innerRef={ (element) => this.contextMenu = element }>
        <ContextMenuItem onClick={ this.renameSelected }
                         disabled={ MocksState.hasSelection }>
          Rename (or doubleclick)
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.deleteSelected }>
          <Icon src="remove" style={ iconStyle }/>
          Delete
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.cut }
                         disabled={ !MocksState.hasSelection } >
          Cut
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.copy }
                         disabled={ !MocksState.hasSelection } >
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
                         disabled={ MocksState.hasSelection } >
          <Icon src="search" style={ iconStyle }/>
          Find related
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.expandAllGroups }
                         disabled={ !MocksState.groups.find((g) => !g.isOpen) }>
          Expand all
        </ContextMenuItem>

        <ContextMenuItem onClick={ this.collapseAllGroups }
                         disabled={ !MocksState.groups.find((g) => g.isOpen) }>
          Collapse all
        </ContextMenuItem>
      </ContextMenuWrapper>
    );
  }
}

export default enhanceWithClickOutside(ContextMenu);
