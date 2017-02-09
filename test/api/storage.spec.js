import { API } from 'api';

// TODO: support clearing state when cleaning storage
describe('persistent storage', () => {

  it('should clear', () => {
    expect(API.mocks.length).toBe(0);

    API.mockRequest('test scenario');
    expect(API.mocks.length).toBe(1);

    API.clearStorage();

    expect(API.mocks.length).toBe(0);
  });

});
