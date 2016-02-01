import URI from 'urijs';

// make these available for eval
import _faker from 'faker/build/build/faker';
import _state from 'api/local-state';

export function transformResponse(responseRule, request) {
    // Setup local variables for eval
  let url = URI(request.url);
  let path = url.segmentCoded();
  let query = url.search(true);
  let data = JSON.parse(request.body);
  let faker = _faker;
  let state = _state;

  // match all {{ ... }} and eval the inner expression
  // NOTE: don't use () => because we need arguments of this function
  let response = responseRule.body.replace(/{{([^{}]*)}}/g, function() {
    try {
      return JSON.stringify(eval(arguments[1]));
    } catch (err) {
      return 'ERROR_EVAL';
    }
  });
  try {
    return JSON.stringify(response);
  } catch (err) {
    throw new Error(`Response ${response} does not evaulate to a valid JSON: ${err}`);
  }
}
