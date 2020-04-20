import { v4 as uuid }  from 'uuid';
import assign from 'lodash/assign';
import Mocks from 'api/mocks';

export class Group {

  constructor({ id, name, active = true }) {
    assign(this, {
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
    assign(this, group);
  }

  export() {
    return this;
  }
}
