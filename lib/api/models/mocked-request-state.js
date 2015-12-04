import uuid from 'uuid';

export class MockedRequestState {

  constructor({ id = uuid.v4(), name, response}) {
    Object.assign(this, { id, name, response });
  }

  update({ name, response }) {
    Object.assign(this, { name, response });
  }
}
