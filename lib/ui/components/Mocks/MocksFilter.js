import React from 'react';
import MocksState from 'ui/states/MocksState';
import SelectBar from 'ui/components/common/SelectBar';
import { MocksFiltersContainer } from 'ui/components/Mocks/styled'

export const filterByType = (mock) => {
  const status = mock.response.status;

  switch (MocksState.filter) {
    case 'Enabled':
      return !!mock.active;

    case 'Disabled':
      return !mock.active;

    case 'Successful':
      return status < 400 || status >= 600;

    case 'Failing':
      return status >= 400 && status < 600;

    default:
      return true;
  }
};


class MocksFilter  extends React.Component {
  onFilterChange = (val) => {
    MocksState.updateFilter(val);
  };

  render() {
    return (
      <MocksFiltersContainer { ...this.props }>
        { "Filter results:  " }
        <SelectBar values={ ['All', 'Enabled', 'Disabled', 'Successful', 'Failing'] }
                   selectedValue={ MocksState.filter }
                   onChange={ this.onFilterChange }
                   smaller/>
      </MocksFiltersContainer>
    );
  }
}

export default MocksFilter;
