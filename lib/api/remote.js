import Interceptor from 'api/interceptor';
import { API } from 'api';

function connect(options = { hostname: 'localhost', port: 5000 }) {
  API.setMode('remote');
  new Interceptor('remote', options);

  return API;
}

export default connect;


