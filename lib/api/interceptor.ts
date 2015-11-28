import { ShredderStorage } from './storage';

class XHRInterceptor {
  constructor() {
    const scenarios = ShredderStorage.getEnabledScenarios();

    xhook.before((request, responder) => {
      for (let scenario of scenarios) {
        for (let rule of scenario.rules) {
          const methodsMatch = request.method === rule.request.method;
          const urlsMatch    = request.url === rule.request.url;
          const paramsMatch  = this.checkParamsEquality(request.body, rule.request.parameters);

          if (methodsMatch && urlsMatch && paramsMatch && rule.active) {
            return this.buildResponse(responder, rule.response);
          }
        }
      }

      return responder()
    });
  }

  install() {
    xhook.activate();
  }

  uninstall() {
    xhook.deactivate();
  }

  buildResponse(responder, responseRule) {
    const response = {
      status: responseRule.statusCode || 200,
      data: JSON.stringify(responseRule.body || {}),
      headers: responseRule.headers || {}
    };

    if (responseRule.delay > 0) {
      return setTimeout(() => responder(response), responseRule.delay);
    }

    return responder(response);
  }

  checkParamsEquality(requestBody = {}, responseParams) {
    try {
      const requestParams = JSON.parse(requestBody);
      const parameters    = Object.keys(requestParams);

      for (let key of parameters) {
        const regex = responseParams[key] ? new RegExp(responseParams[key]) : null;

        if (regex && !requestParams[key].match(regex)) {
          return false;
        }
      }

      return true;
    } catch (err) {
      return true;
    }
  }
}

export default new XHRInterceptor();
