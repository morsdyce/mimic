import { API } from 'api';
import { PersistentStorage } from 'api/storage';
import MockedRequests from 'api/mocked-requests';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';

describe('api interface', () => {

  it('should export api version', () => {
    expect(API.version).toBe('0.0.1');
  });

  it('should have capturedRequests property', () => {
    expect(API.capturedRequests).toBeDefined();
    expect(API.capturedRequests.length).toBe(0);
  });

  it('should have mockedRequests property', () => {
    expect(API.mockedRequests).toBeDefined();
    expect(API.mockedRequests.length).toBe(0);
  });

  it('should have scenarios property', () => {
    expect(API.scenarios).toBeDefined();
    expect(API.scenarios.length).toBe(0);
  });

  it('should get raw data', () => {
    spyOn(PersistentStorage, 'getRaw').and.returnValue('fake data');

    expect(PersistentStorage.getRaw).not.toHaveBeenCalled();

    let data = API.rawData;

    expect(data).toBe('fake data');
    expect(PersistentStorage.getRaw).toHaveBeenCalled();
  });

  it('should add a scenario', () => {
    spyOn(Scenarios, 'addScenario');

    expect(Scenarios.addScenario).not.toHaveBeenCalled();

    API.addScenario('test scenario');

    expect(Scenarios.addScenario).toHaveBeenCalledWith('test scenario');
  });

  it('should rename a scenario', () => {
    spyOn(Scenarios, 'renameScenario');

    expect(Scenarios.renameScenario).not.toHaveBeenCalled();

    API.renameScenario(1, 'test scenario');

    expect(Scenarios.renameScenario).toHaveBeenCalledWith(1, 'test scenario');
  });

  it('should remove a scenario', () => {
    spyOn(Scenarios, 'removeScenario');

    expect(Scenarios.removeScenario).not.toHaveBeenCalled();

    API.removeScenario(1);

    expect(Scenarios.removeScenario).toHaveBeenCalledWith(1);
  });

  it('should duplicate a scenario', () => {
    spyOn(Scenarios, 'duplicateScenario');

    expect(Scenarios.duplicateScenario).not.toHaveBeenCalled();

    API.duplicateScenario(1);

    expect(Scenarios.duplicateScenario).toHaveBeenCalledWith(1);
  });

  it('should set the current scenario', () => {
    spyOn(Scenarios, 'setCurrentScenario');

    expect(Scenarios.setCurrentScenario).not.toHaveBeenCalled();

    API.setCurrentScenario(1);

    expect(Scenarios.setCurrentScenario).toHaveBeenCalledWith(1);
  });

  it('should get the current scenario', () => {
    spyOn(Scenarios, 'getCurrentScenario').and.returnValue(1)

    expect(Scenarios.getCurrentScenario).not.toHaveBeenCalled();

    let currentScenario = API.getCurrentScenario();

    expect(Scenarios.getCurrentScenario).toHaveBeenCalled();
    expect(currentScenario).toBe(1);
  });

  it('should add mocked request to scenario', () => {
    spyOn(Scenarios, 'addMockedRequestToScenario');

    expect(Scenarios.addMockedRequestToScenario).not.toHaveBeenCalled();

    API.addMockedRequestToScenario(1, 2);

    expect(Scenarios.addMockedRequestToScenario).toHaveBeenCalledWith(1, 2);
  });

  it('should mock a request', () => {
    spyOn(MockedRequests, 'addMockedRequest');

    expect(MockedRequests.addMockedRequest).not.toHaveBeenCalled();

    API.mockRequest('request');

    expect(MockedRequests.addMockedRequest).toHaveBeenCalledWith('request');
  });

  it('should clear storage', () => {
    spyOn(PersistentStorage, 'clear');

    expect(PersistentStorage.clear).not.toHaveBeenCalled();

    API.clearStorage();

    expect(PersistentStorage.clear).toHaveBeenCalled();
  });

});
