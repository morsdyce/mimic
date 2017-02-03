import uuid from 'uuid';
import { PersistentStorage } from 'api/storage';
import { MockedRequest } from 'api/models/mocked-request';
import Requests from 'api/requests';
import get from 'lodash/get';
import STATUS_CODES from 'api/constants/status-codes';

export class Scenario {

  constructor({ id = uuid.v4(), name, active = true, mockedRequests = [] }) {
    mockedRequests = mockedRequests.map((mockedRequest) => new MockedRequest(mockedRequest));

    Object.assign(this, { id, name, active, mockedRequests });
  }

  rename(newName) {
    this.name = newName;
  }

  mockRequest(request) {
    const mockedRequest = new MockedRequest(request);
    this.mockedRequests.push(mockedRequest);

    return mockedRequest;
  }

  removeMockedRequest(mockedRequestId) {
    this.mockedRequests.forEach((request, index) => {
      if (request.id === mockedRequestId) {
        return this.mockedRequests.splice(index, 1);
      }
    });
  }

  updateMockedRequest(mockRequestId, request) {
    Requests.capturedRequests
      .filter((capturedRequest) => get(capturedRequest, 'mock.id') === mockRequestId)
      .forEach((capturedRequest) => Requests.update(capturedRequest.id, request.url, request.name));

    this.findMockedRequestById(mockRequestId).update(request);
  }

  findMockedRequestById(mockedRequestId) {
    return this.mockedRequests
      .filter((request) => request.id === mockedRequestId)[0];
  }

  toggleMockedRequest(mockedRequestId) {
    const mockedRequest = this.findMockedRequestById(mockedRequestId);

    mockedRequest.active = !mockedRequest.active;
  }

  export() {
    try {
      const mockedRequests = this.mockedRequests.map((mockedRequest) => mockedRequest.export());
      return Object.assign({}, this, { mockedRequests });
    } catch(ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMock(mockId) {
    try {
      const mock = this.findMockedRequestById(mockId).export();
      return Object.assign({}, this, { mockedRequests: [mock] });
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportMocks(mockIds) {
    try {
      const mocks = mockIds
        .map((mockId) => this.findMockedRequestById(mockId).export());

      return Object.assign({}, this, { mockedRequests: mocks });
    } catch (ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }

  exportAsPostmanCollection() {
    try {
      return {
        variables: [],
        info: {
          name: this.name,
          _postman_id: uuid.v4(),
          description: '',
          schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
        },
        item: this.mockedRequests.map((mock) => ({
          name: mock.fullUrl,
          event: [
            {
              listen: 'test',
              script: {
                type: 'text/javascript',
                exec: [
                  `tests["Status code is ${mock.response.status}"] = responseCode.code === ${mock.response.status};`,
                  '',
                  `var response = ${JSON.stringify(mock.response.body)}`,
                  '',
                  `tests["Body matches string"] = responseBody.has(response);`
                ]
              }
            }
          ],
          request: {
            url: mock.fullUrl,
            method: mock.method,
            header: Object.keys(mock.headers).map((key) => ({
              key,
              value: mock.headers[key],
              description: ''
            })),
            body: mock.params ? {
              mode: 'raw',
              raw: mock.params
            } : {}
          },
          response: [
            {
              id: uuid.v4(),
              name: 'Mocked Response',
              _postman_previewlanguage: 'plain',
              _postman_previewtype: 'text',
              status: STATUS_CODES[mock.response.status],
              code: mock.response.status,
              header: Object.keys(mock.response.headers || {}).map((key) => ({
                name: key,
                key,
                value: mock.headers[key],
                description: ''
              })),
              responseTime: mock.response.delay,
              body: JSON.stringify(mock.response.body)
            }
          ]
        }))
      };
    } catch(ex) {
      if (__ENV === 'development') {
        console.log(ex);
      }
      return null;
    }
  }
}
