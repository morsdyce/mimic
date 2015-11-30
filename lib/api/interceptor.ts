import Scenarios from './scenarios';
import Requests from './requests';

class XHRInterceptor {

  constructor() {
    const rules = Scenarios.currentScenario.rules;

    xhook.before((request, responder) => {
      // Use this to determine how much time the request took
      request.startTime = Date.now();

      for (let rule of rules) {
        const methodsMatch = request.method === rule.request.method;
        const urlsMatch    = request.url === rule.request.url;
        const paramsMatch  = this.checkParamsEquality(request.body, rule.request.parameters);

        if (methodsMatch && urlsMatch && paramsMatch && rule.active) {
          return this.buildResponse(responder, rule.response);
        }
      }

      return responder();
    });

    xhook.after((request, response) => {
      Requests.capture(request, response);
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

    return responseRule.delay > 0
      ? setTimeout(() => responder(response), responseRule.delay)
      : responder(response);
  }

  checkParamsEquality(requestBody, responseParams) {
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
