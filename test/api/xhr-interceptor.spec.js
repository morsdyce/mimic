import 'index';
import superagent from 'superagent';
import Requests from 'api/requests';


describe('xhr interceptor', () => {

  it('should get 0 captured requests', () => {
    expect(Requests.capturedRequests).toBeDefined();
    expect(Requests.capturedRequests.length).toBe(0);
  });

  it('should get a captured request', (done) => {
    expect(Requests.capturedRequests.length).toBe(0);

    superagent.get('http://fake.com')
      .timeout(20)
      .end(() => {
        expect(Requests.capturedRequests.length).toBe(1);

        let request = Requests.capturedRequests[0];
        expect(request.method).toBe('GET');
        expect(request.url).toBe('http://fake.com');

        done();
      });

  });

});
