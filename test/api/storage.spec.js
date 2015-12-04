import { API } from 'api';

// TODO: support clearing state when cleaning storage
describe('persistent storage', () => {

  it('should clear', () => {
    expect(API.scenarios.length).toBe(0);

    API.addScenario('test scenario');
    expect(API.scenarios.length).toBe(1);

    API.clearStorage();

    expect(API.scenarios.length).toBe(0);
  });

});
