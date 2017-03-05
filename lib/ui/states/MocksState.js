import API from 'api';
import EVENTS from 'api/constants/events';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';
import BaseState from 'ui/states/BaseState';

const MIN_SIDEBAR_WIDTH = 340;

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

  constructor() {
    super();

    this.init();
  }

  init() {
    API.on(EVENTS.STORAGE_READY, this.initGroups);
    API.on(EVENTS.IMPORT, this.initGroups);
  }

  initGroups = () => {
    this.groups = [];

    API.groups.map((group) => {
      this.addGroup({
        id: group.id,
        isOpen: false,
        lastState: null
      });
    });
  };

  openMenu = (x, y) => {
    this.contextMenu = { visible: true, x, y };

    this.triggerUpdates();
  };

  closeMenu = () => {
    this.contextMenu.visible = false;

    this.triggerUpdates();
  };

  editItemName = (itemId) => {
    this.renamedItemId = itemId;

    this.triggerUpdates();
  };

  selectFirstMock = () => {
    const mock = API.mocks[0];

    if (!mock) {
      this.selectedItems = [];
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
  };

  deleteSelected = () => {
    this.selectedItems.forEach((item) => {
      if (item instanceof Mock) {
        API.removeMock(item.id)
      }

      if (item instanceof Group) {
        API.removeGroup(item.id);
      }
    });

    this.selectFirstMock();
  };

  get hasSelection() {
    return !!this.selectedItems.length;
  }

  get hasMultipleSelection() {
    return this.selectedItems.length > 1;
  }

  addGroup = (group) => {
    this.groups = [
      ...this.groups,
      group
    ];

    this.triggerUpdates();
  };

  setGroups = (groups) => {
    this.groups = groups;

    this.triggerUpdates();
  };

  expandGroup = (groupId) => {
    this.groups = this.groups.map((group) => {
      if (group.id === groupId) {
        return { ...group, isOpen: true };
      }

      return group;
    });

    this.triggerUpdates();
  };

  selectItems = (selectedItems) => {
    this.selectedItems = selectedItems;

    this.triggerUpdates();
  };

  canPaste = () => {
    const item = this.selectedItems[0];

    return this.selectedItems.length === 1 && item instanceof Group && this.clipboard.items.length > 0;
  };

  clipboardAction = (command, items) => {
    this.clipboard = { command, items };

    this.triggerUpdates();
  };

  recaptureMocks = (mockIds) => {
    this.recaptureRequestIds = mockIds;
    this.triggerUpdates();
  };

  updateQuery = (query) => {
    this.query = query;

    this.triggerUpdates();
  };

  updateFilter = (filter) => {
    this.filter = filter;

    this.triggerUpdates();
  };

  get selectedMocks() {
    return this.selectedItems.filter((item) => item instanceof Mock);
  }

  get selectedGroups() {
    return this.selectedItems.filter((item) => item instanceof Group);
  }

  resizeSidebar = (width) => {
    if (width <= MIN_SIDEBAR_WIDTH || width >= Math.round(window.innerWidth / 2)) {
      return;
    }

    this.sidebarWidth = width;
    this.triggerUpdates();
  };

  adjustSidebarWidthOnResize = () => {
    if (this.sidebarWidth < Math.round(window.innerWidth / 2)) {
      return;
    }

    if (this.sidebarWidth <= MIN_SIDEBAR_WIDTH) {
      return;
    }

    this.sidebarWidth = window.innerWidth / 2;
    this.triggerUpdates();
  };

  expandAllGroups = () => {
    this.groups.forEach((group) => group.isOpen = true);
    this.triggerUpdates();
  };

  collapseAllGroups = () => {
    this.groups.forEach((group) => group.isOpen = false);
    this.triggerUpdates();
  }
}

const singleton = new MocksState();

if (__ENV === 'development') {
  window.mockState = singleton;
}

export default singleton;
