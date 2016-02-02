import URI from 'urijs';

// make these available for eval
import _faker from 'faker/build/build/faker';
import _state from 'api/local-state';
import doT from 'vendor/doT';

export function transformResponse(responseRule, request) {
  try {
    // Setup local variables for eval
    const url = URI(request.url);
    const data = {
      url: url,
      path: url.segmentCoded(),
      query: url.search(true),
      data: JSON.parse(request.body),
      state: _state
    };

    // 1. Compile template function
    const templateFunction = doT.template(responseRule.body);

    return templateFunction(data);
  } catch (err) {
    throw new Error(`Response ${response} does not evaulate to a valid JSON: ${err}`);
  }
}
