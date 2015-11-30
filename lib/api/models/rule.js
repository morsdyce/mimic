import uuid from 'uuid';

export class Rule {

  constructor({ request, response }) {
    Object.assign(this, { id: uuid.v4(), active: true, request, response });
  }

  update({ request, response }) {
    Object.assign(this, { request, response });
  }

}
