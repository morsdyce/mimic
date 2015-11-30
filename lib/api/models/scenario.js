import uuid from 'uuid';
import { MockedRequest } from './mocked-request';

export class Scenario {

  constructor({ id = uuid.v4(), name, rules = [] }) {
    const ruleObjects = [];

    rules.forEach((rule) => ruleObjects.push(new MockedRequest(rule)));

    Object.assign(this, { id, name, rules: ruleObjects });
  }

  addMockedRequest({ request, response }) {
    this.rules.push(new MockedRequest({ request, response }));
  }

  updateMockedRequest(ruleId, request, response) {
    const selectedMockedRequest = this.rules.filter((rule) => rule.id === ruleId);

    selectedMockedRequest.update({ request, response });
  }

}
