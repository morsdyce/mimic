import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Value = styled.div`
  color: red;
  padding: 2px 8px;
  user-select: none;
  background-color: ${(props) => props.isSelected ? '#2d7bd1' : '#f0f0f0'};
  color: ${(props) => props.isSelected ? 'white' : 'black'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

class SelectBar extends React.Component {

  onSelect = (value) => {
    return () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  };

  render() {
    return (
      <Container>
        { this.props.values.map((value) => (
          <Value
            key={ value }
            isSelected={ value === this.props.selectedValue }
            onClick={ this.onSelect(value) }>
            { value }
          </Value>
        ))}

        { this.props.other && <Value>Other...</Value> }
      </Container>
    );
  }
}

export default SelectBar;
