import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';
import { PersistentStorage } from 'api/storage';
import { Group } from 'api/models/group';
import Mocks from 'api/mocks';

import find from 'lodash/find';
import filter from 'lodash/filter';
import remove from 'lodash/remove';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

export class Groups {

  init() {
    this.loadFromStorage();
    this._registerEvents();
  }

  _registerEvents() {
    Emitter.on(EVENTS.IMPORT, this.loadFromStorage, this);
    Emitter.on(EVENTS.STORAGE_PERSIST, this.loadFromStorage, this);
  }

  loadFromStorage() {
    this.all = PersistentStorage.dataTree.groups
      .map((group) => new Group(group));

    PersistentStorage.dataTree.groups = this.all;
  }

  find(options) {
    return find(this.all, options);
  }

  findAll(options) {
    const results = filter(this.all, options);

    if (!results) {
      return [];
    }

    return results;
  }

  mergeGroups(groups) {
    for (const group of groups) {
      const existingGroup = find(this.all, { id: group.id });

      if (existingGroup) {
        Object.assign(existingGroup, group);
      } else {
        this.all.push(new Group(mock));
      }
    }

    PersistentStorage.persist();
  }

  export(arg) {
    if (isString(arg)) {
      return this.find({ id: arg });
    }

    if (isArray(arg)) {
      return arg.map((groupId) => this.find({ id: groupId }));
    }

    return this.all.map((group) => group);
  }

  addGroup(group) {
    const newGroup = new Group(group);
    this.all.push(newGroup);

    PersistentStorage.persist();

    return newGroup;
  }

  updateGroup(groupId, group) {
    this.find({ id: groupId }).update(group);

    PersistentStorage.persist();
  }

  toggleGroup(groupId) {
    const group = this.find({ id: groupId });

    if (group) {
      group.toggleActive();
      PersistentStorage.persist();
    }
  }

  removeGroup(groupId) {
    const group = find(this.all, { id: groupId });

    group.mocks.forEach((mock) => Mocks.removeMock(mock.id));
    remove(this.all, { id: groupId });

    PersistentStorage.persist();
  }
}

export default new Groups();
