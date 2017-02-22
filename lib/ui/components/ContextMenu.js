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

  &:hover {
    background-color: #cbddf5;
    cursor: pointer;
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
    UIState.update({
      mocksSidebarMenu: {
        visible: false,
        x: 0,
        y: 0
      }
    });
  }

  positionMenu = (element) => {
    if (!element) {
      return;
    }

    const bottomMargin = window.innerHeight - UIState.mocksSidebarMenu.y;

    if (element.clientHeight > bottomMargin) {
      element.style.top = UIState.mocksSidebarMenu.y - element.clientHeight + 'px';
    }
  };

  render() {
    if (!UIState.mocksSidebarMenu.visible) {
      return null;
    }

    return (
      <MenuWrapper style={{ top: UIState.mocksSidebarMenu.y, left: UIState.mocksSidebarMenu.x }} innerRef={ this.positionMenu }>
        <MenuItem>
          Rename (or doubleclick)
        </MenuItem>

        <Separator/>

        <MenuItem>
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

        <Separator/>

        <MenuItem>
          <Icon src={ recordIcon } />
          Re-capture from Server
        </MenuItem>

        <Separator/>

        <MenuItem>
          <Icon src={ searchIcon } />
          Find related
        </MenuItem>

        <Separator/>

        <MenuItem>
          Expand all
        </MenuItem>

        <MenuItem>
          Collapse all
        </MenuItem>
      </MenuWrapper>
    );
  }
}

export default UIStateListener(enhanceWithClickOutside(ContextMenu));