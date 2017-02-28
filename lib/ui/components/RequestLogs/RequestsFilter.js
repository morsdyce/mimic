import React from 'react';
import styled from 'styled-components';
import SelectBar from 'ui/components/common/SelectBar'
import RequestLogState from 'ui/states/RequestLogState';

const FiltersContainer = styled.div`
  user-select: none;
  cursor: default;
  display: inline;
  padding: 0 8px;
`;

export const filterByType = (request) => {
  const status = request.response.status || 0;

  switch (RequestLogState.filter) {
    case 'Mocked':
      return !!request.mock;

    case 'Unmocked':
      return !request.mock;

    case 'Successful':
      return status < 400 || status >= 600;

    case 'Failing':
      return status >= 400 && status < 600;

    default:
      return true;
  }
};

class RequestsFilter  extends React.Component {
  onFilterChange = (val) => {
    RequestLogState.updateFilter(val);
  };

  render() {
    return (
      <FiltersContainer { ...this.props }>
        { "Filter results:  " }
        <SelectBar values={ ['All', 'Mocked', 'Unmocked', 'Successful', 'Failing'] }
                   selectedValue={ RequestLogState.filter }
                   onChange={ this.onFilterChange }
                   smaller/>
      </FiltersContainer>
    );
  }
}

export default RequestsFilter;
