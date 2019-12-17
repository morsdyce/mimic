import postManMockBefore from './mocks/postman-import-beforeParse.json';
import postManMockAfter from './mocks/postman-import-afterParse.json';
import { parsePostManJson } from '../../lib/api/utils/postman-parser';

describe('test postman parse', () => {
    it('should return parsed json in mimc format', () => {
        expect(parsePostManJson(postManMockBefore)).toDeepEqual(postManMockAfter)
    })
})