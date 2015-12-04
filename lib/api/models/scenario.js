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

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.mockedRequestId === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });
  }

  updateMockedRequest(ruleId, request, response) {
    const selectedMockedRequest = this.mockedRequests.filter((rule) => rule.id === ruleId);

    selectedMockedRequest.update({ request, response });
  }

}
