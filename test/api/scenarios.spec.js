import { API } from 'api';
import Scenarios from 'api/scenarios';

describe('scenrios', () => {

  beforeEach(() => {
    API.clearStorage();
  });

  it('should get 0 scenarios', () => {
    expect(Scenarios.scenarios.length).toBe(0);
  });

  it('should add a scenario', () => {
    expect(Scenarios.scenarios.length).toBe(0);

    Scenarios.addScenario('test scenario');

    expect(Scenarios.scenarios.length).toBe(1);
    expect(Scenarios.scenarios[0].name).toBe('test scenario');
  });

});
