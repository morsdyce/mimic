import RemoteInterceptor from 'api/interceptors/remote-interceptor';
import API from 'api';

function connect({ hostname = 'localhost', port = 5000 } = {}) {
  API.setMode('remote');
  API.connect({ hostname, port });

  new RemoteInterceptor(API);

  return API;
}

export default connect;
