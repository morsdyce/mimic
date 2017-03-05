import uuid from 'uuid';
import Mocks from 'api/mocks';

export class Group {

  constructor({ id, name, active = true }) {
    Object.assign(this, {
      id: id || uuid.v4(),
      name,
      active
    });
  }

  get mocks() {
    return Mocks.findAll({ groupId: this.id });
  }

  toggleActive() {
    this.active = !this.active;
  }

  update(group) {
    Object.assign(this, group);
  }

  export() {
    return this;
  }
}
