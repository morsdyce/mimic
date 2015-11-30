import uuid from 'uuid';
import { MockedRequests } from '../mocked-requests';

export class Scenario {

  constructor({ id = uuid.v4(), name, mockedRequests = [] }) {
    this.mockedRequests = [];

    mockedRequests.forEach((mockedRequestId) => {
      const mockedRequest = MockedRequests.mockedRequests
        .filter((request) => request.id === mockedRequestId);

      this.mockedRequests.push(mockedRequest)
    });

    Object.assign(this, { id, name });
  }

  addMockedRequest(mockedRequest) {
    this.mockedRequests.push(mockedRequest);
  }

  updateMockedRequest(ruleId, request, response) {
    const selectedMockedRequest = this.mockedRequests.filter((rule) => rule.id === ruleId);

    selectedMockedRequest.update({ request, response });
  }

}
