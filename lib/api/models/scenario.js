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

  addRule({ request, response }) {
    this.rules.push(new Rule({ request, response }));
  }

  updateRule(ruleId, request, response) {
    const selectedRule = this.rules.filter((rule) => rule.id === ruleId);

    selectedRule.update({ request, response });
  }

}
