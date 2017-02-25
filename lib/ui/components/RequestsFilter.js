import React from 'react';
import styled from 'styled-components';
import UIState, { UIStateListener } from 'ui/UIState';
import SelectBar from 'ui/components/SelectBar';

const FiltersContainer = styled.div`
  user-select: none;
  cursor: default;
  display: inline;
  padding: 2px;
`;

export const filterByType = (request) => {
  const status = request.response.status || 0;

  switch (UIState.requestsType) {
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
    UIState.update({ requestsType: val });
  };

  render() {
    return (
      <FiltersContainer { ...this.props }>
        { "Filter results:  " }
        <SelectBar values={ ['All', 'Mocked', 'Unmocked', 'Successful', 'Failing'] }
                   selectedValue={ UIState.requestsType }
                   onChange={ this.onFilterChange }/>
      </FiltersContainer>
    );
  }
}

export default RequestsFilter;
