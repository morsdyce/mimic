import { API } from 'api';

// TODO: support clearing state when cleaning storage
xdescribe('persistent storage', () => {

  xit('should clear', () => {
    expect(API.scenarios.length).toBe(0);

    API.addScenario('test scenario');
    API.clearStorage();

    expect(API.scenarios.length).toBe(1);
  });

});
