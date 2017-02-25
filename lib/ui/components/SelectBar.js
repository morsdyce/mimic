import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  margin-right: 10px;
`;

const Value = styled.div`
  position: relative;
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
  
  ${(props) => props.isDisabled ? 'color: #b6b6b6;' : ''}
  ${(props) => props.isDisabled ? 'cursor: default;' : ''}
  ${(props) => props.isDisabled ? 'background-color: #f0f0f0;' : ''}
`;

const Values = ({ values, disabledValues = [], selectedValue, other, startEditing, onChange }) => (
  <Container>
    {
      values.map((value) => (
        <Value key={ value }
               isSelected={ value === selectedValue }
               isDisabled={ disabledValues.indexOf(value) !== -1 }
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
    box-sizing: border-box;
    padding: 0 4px;
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
      setTimeout(() => elem.select(), 0);
    }
  };

  render() {
    return (
      <Container>
        <StatusForm onSubmit={ this.handleSubmit } onKeyUp={ this.handleKeyDown }>
          <Input type="text"
                 innerRef={ this.setElem }
                 onBlur={ this.props.onBlur }
                 placeholder="Start typing an HTTP status code"/>
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
    this.setState({ editing })
  };

  updateValue = (value) => {
    this.props.onChange(value);
    this.setState({ editing: false });
  };

  render() {
    return this.state.editing
      ? <CustomValue onChange={ this.updateValue }
                     selectedValue={ this.props.selectedValue }
                     onBlur={ () => this.setEditing(false) }/>
      : <Values { ...this.props } startEditing={ () => this.setEditing(true) }/>
  }
}

export default SelectBar;
