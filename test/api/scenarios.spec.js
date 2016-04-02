import { API } from 'api';
import Scenarios from 'api/scenarios';

describe('scenarios', () => {

  afterEach(() => {
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

  it('should get a scenario by id', () => {
    Scenarios.addScenario('test scenario');

    let scenario = Scenarios.getById(Scenarios.scenarios[0].id);
    expect(scenario).toBe(Scenarios.scenarios[0]);
  });

  it('should get a scenario by name', () => {
    Scenarios.addScenario('test scenario');

    let scenario = Scenarios.getByName('test scenario');
    expect(scenario).toBe(Scenarios.scenarios[0]);
  });

  it('should duplicate a scenario', () => {
    Scenarios.addScenario('test scenario');

    expect(Scenarios.scenarios.length).toBe(1);
    Scenarios.duplicateScenario(Scenarios.scenarios[0].id);

    expect(Scenarios.getByName('test scenario copy')).toBeDefined();
    expect(Scenarios.scenarios.length).toBe(2);
  });

  it('should rename a scenario', () => {
    Scenarios.addScenario('test scenario');
    expect(Scenarios.scenarios[0].name).toBe('test scenario');

    Scenarios.renameScenario(Scenarios.scenarios[0].id, 'renamed scenario');
    expect(Scenarios.scenarios[0].name).toBe('renamed scenario');
  });

  it('should remove a scenario', () => {
    expect(Scenarios.scenarios.length).toBe(0);

    Scenarios.addScenario('test scenario');
    expect(Scenarios.scenarios.length).toBe(1);

    Scenarios.removeScenario(Scenarios.scenarios[0].id);
    expect(Scenarios.scenarios.length).toBe(0);
  });

});
