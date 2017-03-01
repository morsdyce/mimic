import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash/omit';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import { downloadFile, copyToClipboard } from 'ui/utils/export';
import Icon from 'ui/components/common/Icon';
import { ContextMenuWrapper, ContextMenuItem, ContextMenuSeparator } from 'ui/components/Mocks/Sidebar/styled';

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
    const mockIds  = this.props.selectedMocks.map((mock) => mock.id);
    const groupIds = this.props.selectedGroups.map((group) => group.id);

    downloadFile('mocks.json', API.exportMocks(mockIds, groupIds, true));
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
      this.props.renamedItemId(item.id);
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
    this.props.canPaste();
  };

  componentDidUpdate() {
    if (!this.contextMenu) {
      return;
    }

    const bottomMargin = window.innerHeight - this.props.contextMenu.y;

    if (this.contextMenu.clientHeight > bottomMargin) {
      this.contextMenu.style.top = this.props.contextMenu.y - this.contextMenu.clientHeight + 'px';
    }
  }

  render() {
    if (!this.props.contextMenu.visible) {
      return null;
    }

    return (
      <ContextMenuWrapper style={{ top: this.props.contextMenu.y, left: this.props.contextMenu.x }}
                          innerRef={ (element) => this.contextMenu = element }>
        <ContextMenuItem onClick={ this.renameSelected }
                         disabled={ this.props.hasSelection }>
          Rename (or doubleclick)
        </ContextMenuItem>

        <ContextMenuSeparator/>

        <ContextMenuItem onClick={ this.deleteSelected }>
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
                         disabled={ this.props.hasSelection }>
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
  closeMenu: React.PropTypes.func.isRequired,
  selectedMocks: React.PropTypes.array.isRequired,
  selectedGroups: React.PropTypes.array.isRequired,
  expandAllGroups: React.PropTypes.func.isRequired,
  collapseAllGroups: React.PropTypes.func.isRequired,
  selectedItems: React.PropTypes.array.isRequired,
  selectFirstMock: React.PropTypes.func.isRequired,
  renameItemId: React.PropTypes.string,
  recaptureMocks: React.PropTypes.func.isRequired,
  recaptureRequestIds: React.PropTypes.array.isRequired,
  updateQuery: React.PropTypes.func.isRequired,
  clipboardAction: React.PropTypes.func.isRequired,
  clipboard: React.PropTypes.shape({
    command: React.PropTypes.string,
    items: React.PropTypes.array.isRequired
  }),
  contextMenu: React.PropTypes.shape({
    visible: React.PropTypes.bool.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }),
  hasSelection: React.PropTypes.bool.isRequired,
  groups: React.PropTypes.array.isRequired,
  canPaste: React.PropTypes.func.isRequired
};

export default enhanceWithClickOutside(ContextMenu);
