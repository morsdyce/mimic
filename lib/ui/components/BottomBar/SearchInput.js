import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';
import ActionIcon from 'ui/components/common/ActionIcon';
import IconDropdown from 'ui/components/common/IconDropdown';
import { Div } from 'ui/components/common/base';
import InputControl from 'ui/components/common/InputControl';

const Container = styled(Div)`
  width: 300px;
  height: 23px;
  display: flex;
  align-items: center;
  border-right: ${(props) => props.theme.lightBorder};
`;

const SearchStyle = {
  border: 'none',
  height: '19px',
  flex: '1',
  outline: 'none',
  'padding-left': '5px',
  'font-size': '13px'
};

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
        <InputControl
          style={ SearchStyle }
          value={ this.props.query}
          onBlur={ this.props.onBlur }
          onFocus={ this.props.onFocus }
          onChange={ this.props.onChange }
          placeholder="Find"
          inputRef={ (node) => this.searchInput = node }/>

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
