export class APIBridge {

  static get(resource) {
    return new Promise((resolve, reject) => {
      window.parent.postMessage({
        type: 'get',
        resource
      }, window.parent.location.origin);

      const cb = (event) => {
        if (event.data.type === `response_${resource}`) {
          resolve(JSON.parse(event.data.data));

          window.removeEventListener('message', cb);
        }
      };

      window.addEventListener('message', cb, false);
    });
  }

  static set(resource, payload) {
    window.parent.postMessage({
      type: 'set',
      resource,
      payload
    }, window.parent.location.origin);
  }

}

