import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import API from 'api';
import UIState, { UIStateListener } from 'ui/UIState';
import deleteIcon from 'ui/assets/images/delete@2x.png';
import recordIcon from 'ui/assets/images/rec@2x.png';
import searchIcon from 'ui/assets/images/loupe@2x.png';

const MenuWrapper = styled.div`
  position: fixed;
  background-color: white;
  border: 1px solid #f0f0f0;
  user-select: none;
  width: 240px;
  z-index: 999999999999;
`;

const MenuItem = styled.div`
  padding: 3px 6px 3px 32px;
  opacity: ${(props) => props.disabled ? '0.3' : '1'};

  &:hover {
    background-color: ${(props) => props.disabled ? 'inherit' : '#cbddf5'};
    cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  }
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-left: -24px;
  cursor: pointer;
  margin-right: 6px;
  vertical-align: middle;
`;

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

  positionMenu = (element) => {
    if (!element) {
      return;
    }

    const bottomMargin = window.innerHeight - UIState.mocksSidebarMenu.y;

    if (element.clientHeight > bottomMargin) {
      element.style.top = UIState.mocksSidebarMenu.y - element.clientHeight + 'px';
    }
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
    UIState.selectedMocks.forEach((mock) => API.removeMock(mock.id));

    if (UIState.selectedGroup) {
      API.removeGroup(UIState.selectedGroup.id);
    }

    this.closeMenu();
  };

  render() {
    if (!UIState.mocksSidebarMenu.visible) {
      return null;
    }

    return (
      <MenuWrapper style={{ top: UIState.mocksSidebarMenu.y, left: UIState.mocksSidebarMenu.x }} innerRef={ this.positionMenu }>
        <MenuItem disabled={ UIState.selectedMocks.length > 1 }>
          Rename (or doubleclick)
        </MenuItem>

        <Separator/>

        <MenuItem onClick={ this.deleteSelected }>
          <Icon src={ deleteIcon } />
          Delete
        </MenuItem>

        <MenuItem>
          Cut
        </MenuItem>

        <MenuItem>
          Copy
        </MenuItem>

        <MenuItem>
          Paste
        </MenuItem>

        <MenuItem>
          Duplicate
        </MenuItem>

        <Separator/>

        <MenuItem>
          Export to JSON
        </MenuItem>

        <Separator/>

        <MenuItem>
          <Icon src={ recordIcon } />
          Re-capture from Server
        </MenuItem>

        <Separator/>

        <MenuItem disabled={ UIState.selectedMocks.length > 1 }>
          <Icon src={ searchIcon } />
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