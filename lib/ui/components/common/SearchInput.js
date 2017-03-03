import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';

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

const StyledIcon = styled(Icon)`
  cursor: pointer;
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
        <StyledIcon src="search" onClick={ this.focusOnField }/>
        <Search value={ this.props.query}
                onBlur={ this.props.onBlur }
                onFocus={ this.props.onFocus }
                onChange={ this.props.onChange }
                placeholder="Find"
                innerRef={ (node) => this.searchInput = node }/>

        { this.props.query && <StyledIcon src="clear" onClick={ this.props.onClearQuery }/> }
      </Container>
    )
  }
}

export default SearchInput;