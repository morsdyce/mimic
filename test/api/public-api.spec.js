import { API } from 'api';
import { PersistentStorage } from 'api/storage';
import Scenarios from 'api/scenarios';
import Requests from 'api/requests';
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';

import importMock from './mocks/import.json';

describe('api interface', () => {

  const noop = () => {};

  it('should export api version', () => {
    expect(API.version).toBe('0.0.1');
  });

  it('should have capturedRequests property', () => {
    expect(API.capturedRequests).toBeDefined();
    expect(API.capturedRequests.length).toBe(0);
  });

  it('should have scenarios property', () => {
    expect(API.scenarios).toBeDefined();
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

  it('should mock a request', () => {
    spyOn(Scenarios, 'mockRequest');

    expect(Scenarios.mockRequest).not.toHaveBeenCalled();

    API.mockRequest(1, 2);

    expect(Scenarios.mockRequest).toHaveBeenCalledWith(1, 2);
  });

  it('should clear storage', () => {
    spyOn(PersistentStorage, 'clear');

    expect(PersistentStorage.clear).not.toHaveBeenCalled();

    API.clearStorage();

    expect(PersistentStorage.clear).toHaveBeenCalled();
  });

  it('should register an event listener', () => {
    spyOn(Emitter, 'on');

    expect(Emitter.on).not.toHaveBeenCalled();
    API.on('event', noop, 'this');

    expect(Emitter.on).toHaveBeenCalledWith('event', noop, 'this');
  });

  it('should register an event listener to be used once', () => {
    spyOn(Emitter, 'once');

    expect(Emitter.once).not.toHaveBeenCalled();
    API.once('event', noop, 'this');

    expect(Emitter.once).toHaveBeenCalledWith('event', noop, 'this');
  });

  it('should remove an event listener', () => {
    spyOn(Emitter, 'removeListener');

    expect(Emitter.removeListener).not.toHaveBeenCalled();
    API.off('event', noop, 'this');

    expect(Emitter.removeListener).toHaveBeenCalledWith('event', noop, 'this');
  });

  it('should export configuration', () => {
    const json = API.export();

    expect(json).toEqual('{"version":"1.0.2","scenarios":[{"id":"default-scenario","name":"Default Scenario","active":true,"mockedRequests":[]}]}');
  });

  it('should import configuration', () => {
    spyOn(Scenarios, 'mergeScenarios');
    spyOn(PersistentStorage, 'persist');
    spyOn(Emitter, 'emit');

    expect(Scenarios.mergeScenarios).not.toHaveBeenCalled();
    expect(PersistentStorage.persist).not.toHaveBeenCalled();
    expect(Emitter.emit).not.toHaveBeenCalled();

    const json = JSON.stringify(importMock);
    API.import(json);

    expect(Scenarios.mergeScenarios).toHaveBeenCalledWith(importMock.scenarios);
    expect(PersistentStorage.persist).toHaveBeenCalled();
    expect(Emitter.emit).toHaveBeenCalledWith(EVENTS.IMPORT);
  });

  it('should allow to set app name', () => {
    spyOn(PersistentStorage, 'setAppName');
    API.setAppName('newname');
    expect(PersistentStorage.setAppName).toHaveBeenCalledWith('newname');
  });

  it('should allow to get app name', () => {
    spyOn(PersistentStorage, 'getAppName').and.returnValue('newname');
    expect(API.getAppName()).toEqual('newname');
  });
});
