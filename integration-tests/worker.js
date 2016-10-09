importScripts('../dist/bdsm.worker.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/superagent/2.3.0/superagent.js');

self.addEventListener('message', (message) => {
  const { method, url, requestMethod } = message.data;

  console.log({ method, url, requestMethod });

  // XHR Sample with superagent
  if (requestMethod === 'xhr') {
    superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          self.postMessage('request failed');
          return;
        }

        self.postMessage(res.text);
      });
  }

  // fetch API sample
  if (requestMethod === 'fetch') {
    fetch(url)
      .then((response) => response.text())
      .then((response) => self.postMessage(response))
      .catch((err) => self.postMessage('request failed'));
  }
});