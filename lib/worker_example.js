import 'api/worker';

self.addEventListener('message', () => {
  fetch('http://jsonplaceholder.typicode.com/posts/4')
    .then((response) => {
      return response.json()
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});



