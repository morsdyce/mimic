import { API } from 'api';

describe('api interface', () => {

  it('should export api version', () => {
    expect(API.version).toBe('0.0.1');
  });

});
