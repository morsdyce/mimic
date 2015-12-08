var URI = require('urijs');

// make these available for eval
var faker = require('faker');
import state from 'api/local-state';

export function evalResponse(responseRule, request) {
	  // Setup local variables for eval
  let url = URI(request.url);
  let path = url.segmentCoded();
  let query = url.search(true);
  let data = JSON.parse(request.body);
  // Do the eval
  let result;
  try {
		result = eval(responseRule.body);
  } catch (err) {
  	console.error(err);
  	throw new Error(`Response ${responseRule.body} cannot be evaulated: ${err}`);
  }
  try {
  	return JSON.stringify(result);
  } catch (err) {
  	console.error(err);
  	throw new Error(`Response ${responseRule.body} does not evaulate to a valid JSON: ${err}`);
  }  	
}

