import socketCluster from 'socketcluster-client';
import assign from 'lodash/assign';
import { registerRemoteHandlers } from 'api/utils/remote';

class Socket {
  connect(options, API) {
    const defaultSocketOptions = {
      secure: false,
      hostname: 'localhost',
      port: 5000,
      autoReconnect: true,
      autoReconnectOptions: {
        randomness: 30000
      }
    };

    this.socket = socketCluster.connect(assign({}, defaultSocketOptions, options));

    registerRemoteHandlers(this.socket, API);
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }

  off(event, callback) {
    this.socket.off(event, callback);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  subscribe(event) {
    return this.socket.subscribe(event);
  }
}

export default Socket;