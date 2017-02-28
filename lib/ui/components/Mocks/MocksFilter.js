import React from 'react';
import UIState, { UIStateListener } from 'ui/UIState';
import SelectBar from 'ui/components/common/SelectBar';
import { MocksFiltersContainer } from 'ui/components/Mocks/styled'

export const filterByType = (mock) => {
  const status = mock.response.status;

  switch (UIState.mocksType) {
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
    UIState.update({ mocksType: val });
  };

  render() {
    return (
      <MocksFiltersContainer { ...this.props }>
        { "Filter results:  " }
        <SelectBar values={ ['All', 'Enabled', 'Disabled', 'Successful', 'Failing'] }
                   selectedValue={ UIState.mocksType }
                   onChange={ this.onFilterChange }
                   smaller/>
      </MocksFiltersContainer>
    );
  }
}

export default MocksFilter;
