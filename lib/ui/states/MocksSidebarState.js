import React from 'react';
import API from 'api';
import { Mock } from 'api/models/mock';
import { Group } from 'api/models/group';

class MocksSidebarState {

  contextMenu = {
    visible: false,
    x: 0,
    y: 0
  };

  selectedItems = [];

  groups = [];

  renamedItemId = null;

  recaptureRequestIds = [];

  clipboard = {
    command: null,
    items: []
  };

  listeners = [];

  openMenu(x, y) {
    this.contextMenu = { visible: true, x, y };

    this.triggerUpdates();
  }

  closeMenu() {
    this.contextMenu.visible = false;

    this.triggerUpdates();
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

  get selectedMocks() {
    return this.selectedItems.filter((item) => item instanceof Mock);
  }

  get selectedGroups() {
    return this.selectedItems.filter((item) => item instanceof Group);
  }

  expandAllGroups() {
    this.groups.forEach((group) => group.isOpen = true);
    this.triggerUpdates();
  }

  collapseAllGroups() {
    this.groups.forEach((group) => group.isOpen = false);
    this.triggerUpdates();
  }

  triggerUpdates() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }
}

export default new MocksSidebarState();
