module.exports = {
  'Get Fetch Failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-fetch', 1000)
      .click('#get-fetch')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'Get Fetch mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"1e4cef8d-5724-4e9b-812c-4ed260107194","active":true,"method":"GET","url":"http://bdsm-example.com/get","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":20,"status":200,"body":"GET-FETCH"}}]}]}');
      })
      .waitForElementVisible('#get-fetch', 1000)
      .click('#get-fetch')
      .pause(500)
      .assert.containsText('#result', 'GET-FETCH')
      .end();
  },

  'Get XHR failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-xhr', 1000)
      .click('#get-xhr')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'Get XHR mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"1e4cef8d-5724-4e9b-812c-4ed260107194","active":true,"method":"GET","url":"http://bdsm-example.com/get","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":20,"status":200,"body":"GET-FETCH"}}]}]}');
      })
      .waitForElementVisible('#get-xhr', 1000)
      .click('#get-xhr')
      .pause(500)
      .assert.containsText('#result', 'GET-FETCH')
      .end();
  },

  'Post Fetch Failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-fetch', 1000)
      .click('#post-fetch')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'Post Fetch mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2", "scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9", "name":"Integrationtests", "active":true, "mockedRequests":[{"id":"4b202785-2ac4-4a06-881c-316e0036e46c", "active":true, "method":"POST", "url":"http://bdsm-example.com/post", "headers":{"pragma":"no-cache", "content-type":"text/plain;charset=utf-8", "cache-control":"no-cache", "expires":-1}, "params":{"user":"user", "password":"password"}, "response":{"delay":26, "status":200, "body":"POST-PARAMS"}}]}]}');
      })
      .waitForElementVisible('#post-fetch', 1000)
      .click('#post-fetch')
      .pause(500)
      .assert.containsText('#result', 'POST-PARAMS')
      .end();
  },

  'Post XHR failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-xhr', 1000)
      .click('#post-xhr')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'Post XHR mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"320af574-1a3e-4cd7-9cfc-d170a6b22217","active":true,"method":"POST","url":"http://bdsm-example.com/post","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"user=user&password=password","response":{"delay":0,"status":200,"body":"POST-PARAMS"}}]}]}');
      })
      .waitForElementVisible('#post-xhr', 1000)
      .click('#post-xhr')
      .pause(500)
      .assert.containsText('#result', 'POST-PARAMS')
      .end();
  },

  'GET FETCH Wildcard failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-fetch-wildcard', 1000)
      .click('#get-fetch-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET Fetch Wildcard mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"5f3e7faa-64ea-40c8-9002-4d596c396c43","active":true,"method":"GET","url":"http://bdsm-example.com/get-wildcard/*","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":19,"status":200,"body":"GET-WILDCARD"}}]}]}');
      })
      .waitForElementVisible('#get-fetch-wildcard', 1000)
      .click('#get-fetch-wildcard')
      .pause(500)
      .assert.containsText('#result', 'GET-WILDCARD')
      .end();
  },

  'GET XHR Wildcard failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-xhr-wildcard', 1000)
      .click('#get-xhr-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET XHR Wildcard mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"5f3e7faa-64ea-40c8-9002-4d596c396c43","active":true,"method":"GET","url":"http://bdsm-example.com/get-wildcard/*","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":19,"status":200,"body":"GET-WILDCARD"}}]}]}');
      })
      .waitForElementVisible('#get-xhr-wildcard', 1000)
      .click('#get-xhr-wildcard')
      .pause(500)
      .assert.containsText('#result', 'GET-WILDCARD')
      .end();
  },

  'GET FETCH Request Params Wildcard failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-fetch-params-wildcard', 1000)
      .click('#post-fetch-params-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET Fetch Request Params Wildcard mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2", "scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9", "name":"Integrationtests", "active":true, "mockedRequests":[{"id":"f1597822-c95d-479b-85a2-e60acdc1785f", "active":true, "method":"POST", "url":"http://bdsm-example.com/post-wildcard", "headers":{"pragma":"no-cache", "content-type":"text/plain;charset=utf-8", "cache-control":"no-cache", "expires":-1}, "params":{"user":"*", "password":"*"}, "response":{"delay":25, "status":200, "body":"POST-WILDCARD"}}]}]}');
      })
      .waitForElementVisible('#post-fetch-params-wildcard', 1000)
      .click('#post-fetch-params-wildcard')
      .pause(50)
      .assert.containsText('#result', 'POST-WILDCARD')
      .end();
  },

  'GET XHR Request Params Wildcard failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-fetch-params-wildcard', 1000)
      .click('#post-fetch-params-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET XHR Request Params Wildcard mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"1ad3d21d-c7e8-42c2-a90d-a548c53b4029","active":true,"method":"POST","url":"http://bdsm-example.com/post-wildcard","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"user = * & password = *","response":{"delay":0,"status":200,"body":"POST-WILDCARD"}}]}]}');
      })
      .waitForElementVisible('#post-xhr-params-wildcard', 1000)
      .click('#post-xhr-params-wildcard')
      .pause(500)
      .assert.containsText('#result', 'POST-WILDCARD')
      .end();
  },

  'GET FETCH Url Wildcards + Request param wildcards failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-fetch-both-wildcard', 1000)
      .click('#post-fetch-both-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET Fetch Url Wildcards + Request param wildcards mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version": "1.0.2", "scenarios": [{"id": "3165323e-f5cd-44f4-afda-d8b9045989a9", "name": "Integration tests", "active": true, "mockedRequests": [{"id": "9946425a-5da5-4dfa-adc2-4e166fd5e62c", "active": true, "method": "POST", "url": "http://bdsm-example.com/post-wildcard-both/*", "headers": {"pragma": "no-cache", "content-type": "text/plain; charset=utf-8", "cache-control": "no-cache", "expires": -1}, "params": {"user": "user*", "password": "password*"}, "response": {"delay": 26, "status": 200, "body": "POST-WILDCARD-BOTH"}}]}]}');
      })
      .waitForElementVisible('#post-fetch-both-wildcard', 1000)
      .click('#post-fetch-both-wildcard')
      .pause(50)
      .assert.containsText('#result', 'POST-WILDCARD')
      .end();
  },

  'GET XHR Url Wildcards + Request param wildcards failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#post-xhr-both-wildcard', 1000)
      .click('#post-xhr-both-wildcard')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET XHR Url Wildcards + Request param wildcards mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"3165323e-f5cd-44f4-afda-d8b9045989a9","name":"Integration tests","active":true,"mockedRequests":[{"id":"1850df9b-4260-43fd-b978-1a6b0cfec928","active":true,"method":"POST","url":"http://bdsm-example.com/post-wildcard-both/*","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"user = user* & password = password*","response":{"delay":0,"status":200,"body":"POST-WILDCARD-BOTH"}}]}]}');
      })
      .waitForElementVisible('#post-xhr-both-wildcard', 1000)
      .click('#post-xhr-both-wildcard')
      .pause(50)
      .assert.containsText('#result', 'POST-WILDCARD')
      .end();
  },

  'GET FETCH Delay' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-fetch-delay', 1000)
      .click('#get-fetch-delay')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET Fetch Url Wildcards + Request param wildcards mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"default-scenario","name":"Default Scenario","active":true,"mockedRequests":[{"id":"ed974e36-cdb5-4987-9390-7acc7d342a24","active":true,"method":"GET","url":"http://bdsm-example.com/get-delay","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":"2000","status":200,"body":"GET-DELAY"}}]}]}');
      })
      .waitForElementVisible('#get-fetch-delay', 1000)
      .click('#get-fetch-delay')
      .pause(50)
      .assert.containsText('#result', '')
      .pause(4000)
      .assert.containsText('#result', 'GET-DELAY')
      .end();
  },

  'GET XHR Delay' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#get-xhr-delay', 1000)
      .click('#get-xhr-delay')
      .pause(500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET XHR Url Wildcards + Request param wildcards mocked' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"default-scenario","name":"Default Scenario","active":true,"mockedRequests":[{"id":"ed974e36-cdb5-4987-9390-7acc7d342a24","active":true,"method":"GET","url":"http://bdsm-example.com/get-delay","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"params":"","response":{"delay":"2000","status":200,"body":"GET-DELAY"}}]}]}');
      })
      .waitForElementVisible('#get-xhr-delay', 1000)
      .click('#get-xhr-delay')
      .pause(50)
      .assert.containsText('#result', '')
      .pause(4000)
      .assert.containsText('#result', 'GET-DELAY')
      .end();
  },

  'GET FETCH Worker failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#webworker-get-fetch', 1000)
      .click('#webworker-get-fetch')
      .pause(1000)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET Fetch Worker' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"default-scenario","name":"Default Scenario","active":true,"mockedRequests":[{"id":"e218a790-5c9b-47f2-87da-184b949a9ed4","active":true,"method":"GET","url":"http://bdsm-example.com/worker","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"response":{"delay":25,"status":200,"body":"FETCH-WORKER"}}]}]}');
      })
      .waitForElementVisible('#webworker-get-fetch', 1000)
      .click('#webworker-get-fetch')
      .pause(1000)
      .assert.containsText('#result', '"FETCH-WORKER"')
      .end();
  },

  'GET XHR Worker failed' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .waitForElementVisible('#webworker-get-xhr', 1000)
      .click('#webworker-get-xhr')
      .pause(1500)
      .assert.containsText('#result', 'request failed')
      .end();
  },

  'GET XHR Worker' : function (browser) {
    browser
      .url('http://127.0.0.1:8080/integration-tests')
      .execute(function(data) {
        window.bdsm.api.import('{"version":"1.0.2","scenarios":[{"id":"default-scenario","name":"Default Scenario","active":true,"mockedRequests":[{"id":"e218a790-5c9b-47f2-87da-184b949a9ed4","active":true,"method":"GET","url":"http://bdsm-example.com/worker","headers":{"pragma":"no-cache","content-type":"text/plain; charset=utf-8","cache-control":"no-cache","expires":-1},"response":{"delay":25,"status":200,"body":"FETCH-WORKER"}}]}]}');
      })
      .waitForElementVisible('#webworker-get-xhr', 1000)
      .click('#webworker-get-xhr')
      .pause(1500)
      .assert.containsText('#result', '"FETCH-WORKER"')
      .end();
  },
};
