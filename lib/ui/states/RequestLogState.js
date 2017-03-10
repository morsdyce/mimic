import BaseState from 'ui/states/BaseState';

class RequestLogState extends BaseState {

  columns = {
    time: 90,
    url: 44,
    params: 160,
    status: 40,
    delay: 40
  };

  minLength = {
    time: 59,
    url: 44,
    params: 102,
    status: 40,
    delay: 40
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
