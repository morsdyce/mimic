import { v4 as uuidv4 }  from 'uuid';
import assign from 'lodash/assign';
import Mocks from 'api/mocks';

export class Group {

  constructor({ id, name, active = true }) {
    assign(this, {
      id: id || uuidv4(),
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
