import API from 'api';
import { PersistentStorage } from 'api/storage';
import Mocks from 'api/mocks';
import Groups from 'api/groups';
import Requests from 'api/requests';
import Emitter from 'api/emitter';
import EVENTS from 'api/constants/events';

import petstoreSwagger
  from './fixtures/swagger/swagger.json';
import petstoreMimic
  from './fixtures/swagger/petstore_mimic_mock.json';

describe('import swagger', () => {

  describe('multiple swagger responses for single action', () => {
    it('should split responses into separate mocks', (done) => {
      spyOn(Mocks, 'mergeMocks');
      spyOn(Groups, 'mergeGroups');
      spyOn(PersistentStorage, 'persist');
      spyOn(Emitter, 'emit');


      expect(Mocks.mergeMocks).not.toHaveBeenCalled();
      expect(Groups.mergeGroups).not.toHaveBeenCalled();
      expect(Emitter.emit).not.toHaveBeenCalled();
      const json = JSON.stringify(petstoreSwagger);
      API.import(json, { 'external_import': 'swagger' }).then((status) => {
        expect(Mocks.mergeMocks).toHaveBeenCalledWith(petstoreMimic.mocks, { 'external_import': 'swagger' } );
        expect(Groups.mergeGroups).toHaveBeenCalledWith(petstoreMimic.groups);
        expect(Emitter.emit).toHaveBeenCalledWith(EVENTS.IMPORT);
        expect(status.success).toEqual(true);

        done();
      });
    });
  //it('should only enable the first response', (done) => {
  //p.then(expect(Mocks.mergeMocks).toHaveBeenCalledWith(
  //petstoreMimic.mocks, undefined
  //));
  //done();
  //})
  })
  //it('should use the default delay', () => {
  //})

});

