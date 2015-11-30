import uuid from 'uuid';
import { MockedRequest } from './mocked-request';

export class Scenario {

  constructor({ id = uuid.v4(), name, mockedRequests = [] }) {
    const ruleObjects = [];

    mockedRequests.forEach((rule) => ruleObjects.push(new MockedRequest(rule)));

    Object.assign(this, { id, name, mockedRequests: ruleObjects });
  }

  addMockedRequest({ request, response }) {
    this.mockedRequests.push(new MockedRequest({ request, response }));
  }

  updateMockedRequest(ruleId, request, response) {
    const selectedMockedRequest = this.mockedRequests.filter((rule) => rule.id === ruleId);

    selectedMockedRequest.update({ request, response });
  }

}
