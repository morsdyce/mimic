function _getRulesFromStorage() {
  return JSON.parse(localStorage.getItem(`${ location.origin }-shredder`))
}

function _checkParamsEquality(requestBody = {}, responseParams) {
  const requestParams = JSON.parse(requestBody);
  let isEqual = true;

  Object.keys(requestParams).forEach((key) => {
    const regex = responseParams[key] ? new RegExp(responseParams[key]) : null;

    if (regex && !requestParams[key].match(regex)) {
      isEqual = false;
    }
  })

  return isEqual;
}

function _createResponse(cb, responseObject) {
  const response = {
    status: responseObject.statusCode || 200,
    data: JSON.stringify(responseObject.body || {}),
    headers: responseObject.headers || {}
  };

  if (responseObject.delay > 0) {
    return setTimeout(() => cb(response), responseObject.delay);
  }

  return cb(response);
}

const rules = _getRulesFromStorage();

xhook.before((request, responder) => {
  for (let rule of rules) {
    const methodsMatch = request.method === rule.request.method;
    const urlsMatch    = request.url === rule.request.url;
    const paramsMatch  = _checkParamsEquality(request.body, rule.request.parameters);

    if (methodsMatch && urlsMatch && paramsMatch) {
      return _createResponse(responder, rule.response);
    }
  }

  return responder()
});
