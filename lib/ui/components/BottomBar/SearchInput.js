import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';
import ActionIcon from 'ui/components/common/ActionIcon';
import IconDropdown from 'ui/components/common/IconDropdown';
import { Div } from 'ui/components/common/base';

const Container = styled(Div)`
  width: 300px;
  height: 23px;
  display: flex;
  align-items: center;
  border-right: ${(props) => props.theme.lightBorder};
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  outline: none;
  padding-left: 5px;
  font-size: 13px;
`;

class SearchInput extends React.Component {

  focusOnField = () => {
    if (this.searchInput) {
      this.searchInput.select();
    }
  };

  render() {
    return (
      <Container>
        <Icon src="search" onClick={ this.focusOnField }/>
        <Search value={ this.props.query}
                onBlur={ this.props.onBlur }
                onFocus={ this.props.onFocus }
                onChange={ this.props.onChange }
                placeholder="Find"
                innerRef={ (node) => this.searchInput = node }/>

        { this.props.query && <ActionIcon action="clear" onClick={ this.props.onClearQuery }/> }

        <IconDropdown icon="filter"
                      value={ this.props.filterValue }
                      position="right"
                      align="left"
                      anchorPoint="bottom"
                      onChange={ this.props.onFilterChange }
                      options={ this.props.filterOptions }/>
      </Container>
    )
  }
}

export default SearchInput;