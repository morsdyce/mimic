class BaseState {

  listeners = [];

  triggerUpdates = () => {
    this.listeners.forEach((listener) => listener());
  };

  subscribe(callback) {
    this.listeners.push(callback);

    this.triggerUpdates();
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }
}

export default BaseState;
