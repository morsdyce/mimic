import API from 'api';
import Mocks from 'api/mocks';

const request = {
  method: 'GET',
  url: 'example.com',
  headers: {},
  params: {},
  response: {
    status: 200,
    delay: 0,
    body: {}
  },
  name: 'exampleRequest',
  origin: 'example.com'
};

describe('mocks', () => {

  beforeEach(() => {
    API.clearStorage();
  });

  it('should get 0 mocks', () => {
    expect(Mocks.all.length).toBe(0);
  });

  it('should add a mock', () => {
    expect(Mocks.all.length).toBe(0);

    Mocks.mockRequest(request);

    expect(Mocks.all.length).toBe(1);
    expect(Mocks.all[0].name).toBe('exampleRequest');
  });

  it('should get a mock by id', () => {
    Mocks.mockRequest(request);

    let mock = Mocks.getById(Mocks.all[0].id);
    expect(mock).toBe(Mocks.all[0]);
  });

  it('should get a mock by name', () => {
    Mocks.mockRequest(request);

    let mock = Mocks.getByName('test mock');
    expect(mock).toBe(Mocks.all[0]);
  });

  it('should rename a mock', () => {
    Mocks.mockRequest(request);
    expect(Mocks.all[0].name).toBe('exampleRequest');

    Mocks.rename(Mocks.all[0].id, 'renamed mock');
    expect(Mocks.all[0].name).toBe('renamed mock');
  });

  it('should remove a mock', () => {
    expect(Mocks.all.length).toBe(0);

    Mocks.mockRequest(request);
    expect(Mocks.all.length).toBe(1);

    Mocks.removeMock(Mocks.all[0].id);
    expect(Mocks.all.length).toBe(0);
  });

});
