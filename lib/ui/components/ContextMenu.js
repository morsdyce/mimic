import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import { downloadFile } from 'ui/utils/downloadFile';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import Icon from 'ui/components/Icon';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import { selectFirstMock } from 'ui/utils/mocks';

const MenuWrapper = styled.div`
  position: fixed;
  background-color: white;
  border: 1px solid #f0f0f0;
  user-select: none;
  width: 240px;
  z-index: 2147483647;
`;

const MenuItem = styled.div`
  padding: 3px 6px 3px 32px;
  opacity: ${(props) => props.disabled ? '0.3' : '1'};

  &:hover {
    background-color: ${(props) => props.disabled ? 'inherit' : '#cbddf5'};
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  }
`;

const iconStyle = {
  marginLeft: -24,
  cursor: 'pointer',
  marginRight: 6,
  verticalAlign: 'middle',
};

const Separator = styled.div`
  margin-bottom: 10px;
`;

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
      <MenuWrapper style={{ top: UIState.mocksSidebarMenu.y, left: UIState.mocksSidebarMenu.x }}
                   innerRef={ (element) => this.contextMenu = element }>
        <MenuItem onClick={ this.renameSelected } disabled={ UIState.selectedItems.length > 1 }>
          Rename (or doubleclick)
        </MenuItem>

        <Separator/>

        <MenuItem onClick={ this.deleteSelected }>
          <Icon src="remove" style={ iconStyle }/>
          Delete
        </MenuItem>

        <MenuItem disabled>
          Cut
        </MenuItem>

        <MenuItem  disabled>
          Copy
        </MenuItem>

        <MenuItem  disabled>
          Paste
        </MenuItem>

        <MenuItem onClick={ this.cloneSelected }>
          Duplicate
        </MenuItem>

        <Separator/>

        <MenuItem onClick={ this.downloadAsFile }>
          Export to JSON
        </MenuItem>

        <Separator/>

        <MenuItem onClick={ this.recaptureMocks }>
          <Icon src="record" style={ iconStyle }/>
          Re-capture from Server
        </MenuItem>

        <Separator/>

        <MenuItem disabled={ UIState.selectedItems.length > 1 }>
          <Icon src="search" style={ iconStyle }/>
          Find related
        </MenuItem>

        <Separator/>

        <MenuItem onClick={ this.expandAllGroups }
                  disabled={ !UIState.groups.find((g) => !g.isOpen) }>
          Expand all
        </MenuItem>

        <MenuItem onClick={ this.collapseAllGroups }
                  disabled={ !UIState.groups.find((g) => g.isOpen) }>
          Collapse all
        </MenuItem>
      </MenuWrapper>
    );
  }
}

export default UIStateListener(enhanceWithClickOutside(ContextMenu));
