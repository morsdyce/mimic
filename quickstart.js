$.ajaxSetup({ 'cache': true });

function handleFailure(resultId) {
  return function(error) {
    $('.' + resultId).text(JSON.stringify({ status: error.status, statusText: error.statusText }));
  }
}

function handleSuccess(resultId) {
  return function (response, requestState, requestDetails) {;
    var parsedResponse;
    try {
      parsedResponse = JSON.stringify(response, null, 2);
    } catch (err) {
      parsedResponse = response;
    }

    $('.' + resultId).text(decodeURIComponent(parsedResponse));
  }
}

$(function() {

  $('.test1').click(function() {
    $.get('http://500tech.github.io/bdsm/example.json')
      .done(handleSuccess('result1'))
      .fail(handleFailure('result1'));
  });

});
