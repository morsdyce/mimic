import API from 'api';
import { PersistentStorage } from 'api/storage';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import Requests from 'api/requests';
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';

import importMock from './mocks/import.json';

describe('api interface', () => {

  const noop = () => {};

  it('should export api version', () => {
    expect(API.version).toBeDefined();
  });

  it('should have capturedRequests property', () => {
    expect(API.capturedRequests).toBeDefined();
    expect(API.capturedRequests.length).toBe(0);
  });

  it('should have mocks property', () => {
    expect(API.mocks).toBeDefined();
  });

  it('should rename a mock', () => {
    spyOn(Mocks, 'renameMock');

    expect(Mocks.renameMock).not.toHaveBeenCalled();

    API.renameMock(1, 'test mock');

    expect(Mocks.renameMock).toHaveBeenCalledWith(1, 'test mock');
  });

  it('should remove a mock', () => {
    spyOn(Mocks, 'removeMock');

    expect(Mocks.removeMock).not.toHaveBeenCalled();

    API.removeMock(1);

    expect(Mocks.removeMock).toHaveBeenCalledWith(1);
  });

  it('should mock a request', () => {
    spyOn(Mocks, 'mockRequest');

    expect(Mocks.mockRequest).not.toHaveBeenCalled();

    API.mockRequest(1);

    expect(Mocks.mockRequest).toHaveBeenCalledWith(1);
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

    expect(json).toEqual('{"version":"2.0.0","mocks":[],"groups":[]}');
  });

  it('should import configuration', () => {
    spyOn(Mocks, 'mergeMocks');
    spyOn(Groups, 'mergeGroups');
    spyOn(PersistentStorage, 'persist');
    spyOn(Emitter, 'emit');

    expect(Mocks.mergeMocks).not.toHaveBeenCalled();
    expect(Groups.mergeGroups).not.toHaveBeenCalled();
    expect(Emitter.emit).not.toHaveBeenCalled();

    const json = JSON.stringify(importMock);
    API.import(json);

    expect(Mocks.mergeMocks).toHaveBeenCalledWith(importMock.mocks);
    expect(Groups.mergeGroups).toHaveBeenCalledWith(importMock.groups);
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
