import uuid from 'uuid';
import Mocks from 'api/mocks';

export class Group {

  constructor({ id = uuid.v4(), name, active = true }) {
    Object.assign(this, { id, name, active });
  }

  get mocks() {
    return Mocks.find({ groupId: this.id }) || [];
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
