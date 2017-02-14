import uuid from 'uuid';

export class Group {

  constructor({ id = uuid.v4(), name, mocks = [], active = true }) {
    Object.assign(this, { id, name, mocks, active });
  }

  toggleActive() {
    this.active = !this.active;
  }

  addMock(id) {
    this.mocks.push(id);
  }

  removeMock(id) {
    this.mocks = this.mocks.filter((mockId) => mockId !== id);
  }

  update(group) {
    Object.assign(this, group);
  }

}
