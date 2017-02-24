export const request = ({ method, url, headers, params }, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return;
    }

    cb({
      status: this.status,
      body: this.response,
      headers: {} // TODO: this.getAllResponseHeaders()
    });
  };

  xhr.open(method, url, true);

  Object.keys(headers).forEach((header) => {
    xhr.setRequestHeader(header, headers[header]);
  });

  xhr.send(params);
};