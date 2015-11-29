import uuid from 'uuid';
import { Rule } from './rule';

export class Scenario {

  public id;
  public name;
  public rules;

  constructor({ id = uuid.v4(), name, rules = [] }) {
    const ruleObjects = [];

    rules.forEach((rule) => ruleObjects.push(new Rule(rule)));

    Object.assign(this, { id, name, rules: ruleObjects });
  }

}
