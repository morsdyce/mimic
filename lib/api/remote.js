import Interceptor from 'api/interceptor';
import { API } from 'api';

function connect({ hostname = 'localhost', port = 5000 } = {}) {
  API.setMode('remote');
  new Interceptor('remote', { hostname, port });

  return API;
}

export default connect;
