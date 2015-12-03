import { API } from 'api';
import superagent from 'superagent';

describe('api interface', () => {

  beforeEach(() => {
    API.clearStorage();
  });

  it('should export api version', () => {
    expect(API.version).toBe('0.0.1');
  });

  it('should get 0 captured requests', () => {
    expect(API.capturedRequests).toBeDefined();
    expect(API.capturedRequests.length).toBe(0);
  });

  it('should get a captured request', (done) => {
    expect(API.capturedRequests.length).toBe(0);

    superagent.get('http://fake.com')
      .timeout(20)
      .end(() => {
        expect(API.capturedRequests.length).toBe(1);

        let request = API.capturedRequests[0];
        expect(request.method).toBe('GET');
        expect(request.url).toBe('http://fake.com');

        done();
      });

  });

  it('should get 0 scenarios', () => {
    expect(API.scenarios.length).toBe(0);
  });

  it('should add a scenario', () => {
    expect(API.scenarios.length).toBe(0);

    API.addScenario('test scenario');

    expect(API.scenarios.length).toBe(1);
    expect(API.scenarios[0].name).toBe('test scenario');
  });

  // TODO: support clearing state when cleaning storage
  xit('should clear persistent storage', () => {
    expect(API.scenarios.length).toBe(0);

    API.addScenario('test scenario');
    API.clearStorage();

    expect(API.scenarios.length).toBe(1);
  });

});
