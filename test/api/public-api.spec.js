import { API } from 'api';

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

});
