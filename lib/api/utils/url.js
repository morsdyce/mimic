export class UrlUtils {

  static _reduceParamsToObject(accumulator, currVal) {
    const [key, value] = currVal.split('=');

    accumulator[key] = decodeURI(value);
    return accumulator;
  }

  /**
   * Parse a Query string into an object
   *
   * @param  {String} query The query to parse
   * @return {Object}       Params object
   */
  static parseQueryString(query = '') {
    return query.split('&').reduce(UrlUtils._reduceParamsToObject, {});
  }

  /**
   * Parse a body string into an object of params
   * Supports JSON or Query string (key=val&key=val)
   *
   * @param  {string} body Body data
   * @return {Object}      Params object
   */
  static parseRequestBody(body) {
    let result;

    try {
      result = JSON.parse(body);
    } catch (e) {
      // the body is not in a valid JSON format, try to parse as URL queries
      result = UrlUtils.parseQueryString(body);
    }

    return result || {};
  }
  static _escapeRegExp(str = '') {
    return str.toString().replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&");
  }

}
