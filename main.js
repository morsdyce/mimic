$.ajaxSetup({ 'cache': true });

var mockData = {
  "version": "1.0.2",
  "scenarios": [
    {
      "id": "default-scenario",
      "name": "Default Scenario",
      "active": true,
      "mockedRequests": [
        {
          "id": "a49a7d6c-6f36-4965-bf33-ef72ee8e2ad4",
          "active": true,
          "method": "GET",
          "url": "http://500tech.github.io/mimic/api/content",
          "headers": {
            "pragma": "no-cache",
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-cache",
            "expires": -1
          },
          "params": null,
          "response": {
            "delay": "0",
            "status": 200,
            "body": "<p>When building web applications, you are in a dynamic environment. In most cases you are not alone working on the project,\nyou are dependent on implementations of server features which you need to wait for to finish your feature.</p>\n<p>Mimic allows you to continue coding as if the server was ready using easily created mocks while testing various scenarios of\nserver responses or delays so you can continue to finish your feature.</p>\n\n<p>You don't need to change anything in your code once the server is ready, just turn off your mock\nand everything is good to go.</p>"
          }
        },
        {
          "id": "59f03c09-654d-4128-9d52-7cc3c1e843f5",
          "active": true,
          "method": "GET",
          "url": "http://500tech.github.io/mimic/api/*/json",
          "headers": {
            "pragma": "no-cache",
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-cache",
            "expires": -1
          },
          "params": null,
          "response": {
            "delay": 166,
            "status": 200,
            "body": {
              "name": "mimicjs",
              "description": "Bad ass client side mocking solution",
              "repository": {
                "type": "git",
                "url": "https://github.com/500tech/mimic.git"
              },
              "author": "500Tech <info@500tech.com>",
              "contributors": [
                {
                  "name": "Alex Ilyaev",
                  "email": "alexilyaev@gmail.com"
                },
                {
                  "name": "Maayan Glikser",
                  "email": "maayan@500tech.com"
                },
                {
                  "name": "Ilya Gelman",
                  "email": "ilyagelman@ilyagelman.com"
                }
              ]
            }
          }
        },
        {
          "id": "4ac80059-08b2-46d3-b752-a8c0f923498f",
          "active": true,
          "method": "POST",
          "url": "http://500tech.github.io/mimic/api/body-wildcards",
          "headers": {
            "pragma": "no-cache",
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-cache",
            "expires": -1
          },
          "params": "name=*&awesomeness=9999",
          "response": {
            "delay": 123,
            "status": 200,
            "body": {
              "match": "a request with different params"
            }
          }
        }
      ]
    },
    {
      "id": "38f89463-f5d3-48ad-b7f2-7ed8daa4d108",
      "name": "alternative",
      "active": false,
      "mockedRequests": [
        {
          "id": "bff40fb2-48c4-4af8-aba4-01b2da230a67",
          "active": true,
          "method": "GET",
          "url": "http://500tech.github.io/mimic/api/content",
          "headers": {
            "pragma": "no-cache",
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-cache",
            "expires": -1
          },
          "params": null,
          "response": {
            "delay": "0",
            "status": 200,
            "body": "<p>Sometimes you just want to have fun</p>"
          }
        }
      ]
    }
  ]
};

if (screen.width > 1024) {
  $.holdReady(true);
  $.getScript("https://npmcdn.com/mimic@1.0.2/dist/mimic.js", function() {
    $.holdReady(false);
  });
}

function animateToggle() {
  var mimicToggle = $('[alt="Toggle Mimic"]');
  var counter = 0;

  var interval = setInterval(function() {
    if (counter > 3) {
      clearInterval(interval);
      return;
    }

    counter += 1;
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(mimicToggle).addClass('animated pulse').one(animationEnd, function() {
      $(mimicToggle).removeClass('animated pulse');
    });
  }, 1500);
}

$(function() {
  if (!localStorage.getItem('firstVisit')) {
    window.mimic.api.import(JSON.stringify(mockData));

    animateToggle();
    localStorage.setItem('firstVisit', '1');
  }

  $.get('http://500tech.github.io/mimic/api/content')
    .then(function(response) {
      $('.details-content').html(response);
    });

  $.get('http://500tech.github.io/mimic/api/some-random-name/json')
    .then(function(response) {
      console.log('Received GET JSON response', response);
    });

  $.post('http://500tech.github.io/mimic/api/body-wildcards', { name: 'mimic', awesomeness: 9999 })
    .then(function(response) {
      console.log('Received post JSON response', response);
    });
});
