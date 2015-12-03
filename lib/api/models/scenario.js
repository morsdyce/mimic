import uuid from 'uuid';
import { MockedRequests } from 'api/mocked-requests';

export class Scenario {

  constructor({ id = uuid.v4(), name, mockedRequests = [] }) {
    Object.assign(this, { id, name, mockedRequests });
  }

  rename(newName) {
    this.name = newName;
  }

  addMockedRequest(mockedRequestId) {
    this.mockedRequests.push({ mockedRequestId, active: true });
  }

  updateMockedRequest(ruleId, request, response) {
    const selectedMockedRequest = this.mockedRequests.filter((rule) => rule.id === ruleId);

    selectedMockedRequest.update({ request, response });
  }

}
