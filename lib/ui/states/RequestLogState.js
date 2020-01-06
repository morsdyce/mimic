import BaseState from 'ui/states/BaseState';

class RequestLogState extends BaseState {

  columns = {
    time: 90,
    url: 200,
    params: 160,
    status: 50,
    delay: 50,
    remove: 90,
  };

  minLength = {
    time: 59,
    url: 44,
    params: 102,
    status: 50,
    delay: 50
  };

  query = '';
  filter = 'All';

  resizeColumn = (name, size) => {
    if (size < this.minLength[name]) {
      return;
    }

    this.columns[name] = size;

    this.triggerUpdates();
  };

  updateQuery = (query) => {
    this.query = query;

    this.triggerUpdates();
  };

  updateFilter = (filter) => {
    this.filter = filter;

    this.triggerUpdates();
  }
}

export default new RequestLogState();
