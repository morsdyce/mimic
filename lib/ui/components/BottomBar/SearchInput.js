import React from 'react';
import styled from 'styled-components';
import ActionIcon from 'ui/components/common/ActionIcon';

const Container = styled.div`
  width: 400px;
  height: 23px;
  display: flex;
  align-items: center;
`;

const Search = styled.input`
  border: none;
  height: 100%;
  flex: 1;
  outline: none;
  padding-left: 5px;
`;

class SearchInput extends React.Component {

  focusOnField = () => {
    if (this.searchInput) {
      this.searchInput.select();
    }
  };

  render () {
    return (
      <Container>
        <ActionIcon action="search" onClick={ this.focusOnField }/>
        <Search value={ this.props.query}
                onBlur={ this.props.onBlur }
                onFocus={ this.props.onFocus }
                onChange={ this.props.onChange }
                placeholder="Find"
                innerRef={ (node) => this.searchInput = node }/>

        { this.props.query && <ActionIcon action="clear" onClick={ this.props.onClearQuery }/> }
      </Container>
    )
  }
}

export default SearchInput;