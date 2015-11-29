import uuid from 'uuid';

export class Scenario {

  public id;
  public name;
  public rules;

  constructor({ id = uuid.v4(), name, rules = [] }) {
    Object.assign(this, { id, name, rules });
  }

}
