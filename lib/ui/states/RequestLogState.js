import BaseState from 'ui/states/BaseState';

class RequestLogState extends BaseState {

  columns = {
    time: 60,
    url: 200,
    params: 160,
    status: 40,
    delay: 40
  };

  query = '';
  filter = 'All';

  resizeColumn(name, size) {
    if (size < 10) {
      return;
    }

    this.columns[name] = size;

    this.triggerUpdates();
  }

  updateQuery(query) {
    this.query = query;

    this.triggerUpdates();
  }

  updateFilter(filter) {
    this.filter = filter;

    this.triggerUpdates();
  }
}

export default new RequestLogState();
