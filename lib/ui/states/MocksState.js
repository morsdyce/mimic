import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import BaseState from 'ui/states/BaseState';

const MIN_SIDEBAR_WIDTH = 340;
const MAX_SIDEBAR_WIDTH = Math.round(window.innerWidth / 2);

class MocksState extends BaseState {

  contextMenu = {
    visible: false,
    x: 0,
    y: 0
  };

  selectedItems = [];

  groups = [];

  renamedItemId = null;

  sidebarWidth = 340;

  recaptureRequestIds = [];

  clipboard = {
    command: null,
    items: []
  };

  query = '';
  filter = 'All';

  openMenu(x, y) {
    this.contextMenu = { visible: true, x, y };

    this.triggerUpdates();
  }

  closeMenu() {
    this.contextMenu.visible = false;

    this.triggerUpdates();
  }

  editItemName(itemId) {
    this.renamedItemId = itemId;
  }

  selectFirstMock() {
    const mock = API.mocks[0];

    if (!mock) {
      this.selectedItems = [];
      this.groups = [];
      return;
    }

    if (mock.groupId) {
      const groups = this.groups.map((group) => {
        if (group.id === mock.groupId) {
          return { ...group, isOpen: true };
        }

        return group;
      });

      this.selectedItems = [mock];
      this.groups = groups;
    } else {
      this.selectedItems = [mock];
    }

    this.triggerUpdates();
  }

  get hasSelection() {
    return this.selectedItems.length > 1;
  }

  setGroups(groups) {
    this.groups = groups;

    this.triggerUpdates();
  }

  selectItems(selectedItems) {
    this.selectedItems = selectedItems;

    this.triggerUpdates();
  }

  canPaste() {
    const item = this.selectedItems[0];

    return this.selectedItems.length > 1 || !(item instanceof Group) || this.clipboard.items.length === 0;
  }

  clipboardAction(command, items) {
    this.clipboard = { command, items };

    this.triggerUpdates();
  }

  recaptureMocks(mockIds) {
    this.recaptureRequestIds = mockIds;
    this.triggerUpdates();
  }

  updateQuery(query) {
    this.query = query;

    this.triggerUpdates();
  }

  updateFilter(filter) {
    this.filter = filter;

    this.triggerUpdates();
  }

  get selectedMocks() {
    return this.selectedItems.filter((item) => item instanceof Mock);
  }

  get selectedGroups() {
    return this.selectedItems.filter((item) => item instanceof Group);
  }

  resizeSidebar(width) {
    if (width <= MIN_SIDEBAR_WIDTH || width >= MAX_SIDEBAR_WIDTH) {
      return;
    }

    this.sidebarWidth = width;

    this.triggerUpdates();
  }

  expandAllGroups() {
    this.groups.forEach((group) => group.isOpen = true);
    this.triggerUpdates();
  }

  collapseAllGroups() {
    this.groups.forEach((group) => group.isOpen = false);
    this.triggerUpdates();
  }
}

export default new MocksState();
