import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
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

const Values = ({ values, selectedValue, other, startEditing, onChange }) => (
  <Container>
  {
    values.map((value) => (
      <Value
        key={ value }
        isSelected={ value === selectedValue }
        onClick={ () => onChange && onChange(value) }>
        { value }
      </Value>
    ))
  }

  { other && <Value onClick={ startEditing }>Other...</Value> }
  </Container>
);

const StatusForm = styled.form`
  width: 220px;
`;

const Input = styled.input`
  border: none;
  background-color: #f0f0f0;
  outline: 0;
  border-radius: 4px;
  height: 24px;
  font-size: 13px;
  line-height: 20px;
  padding: 0 6px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    border: 2px solid #b2c9ee;
  }
`;

class CustomValue extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onChange(parseInt(this.elem.value, 10));
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onChange(this.props.selectedValue);
    }
  };

  setElem = (elem) => {
    this.elem = elem;

    if (elem) {
      elem.value = this.props.selectedValue;
    }
  };

  render() {
    return (
      <Container>
        <StatusForm onSubmit={ this.handleSubmit } onKeyUp={ this.handleKeyDown } >
          <Input type="text"
                 ref={ this.setElem }
                 autoFocus
                 placeholder="Start typing an HTTP status code" />
        </StatusForm>
      </Container>
    );
  }
}

class SelectBar extends React.Component {
  constructor() {
    super();
    this.state = { editing: false };
  }

  setEditing = (editing) => {
    this.setState({ editing})
  };

  updateValue = (value) => {
    this.props.onChange(value);
    this.setState({ editing: false });
  };

  render() {
    return this.state.editing
      ? <CustomValue onChange={ this.updateValue } selectedValue={ this.props.selectedValue } />
      : <Values { ...this.props } startEditing={ () => this.setEditing(true) }/>
  }
}

export default SelectBar;
