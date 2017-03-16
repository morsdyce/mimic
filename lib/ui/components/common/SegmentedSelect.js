import React from 'react';
import styled from 'styled-components';
import Icon from 'ui/components/common/Icon';
import HttpStatusCodes from 'http-status-codes';
import { Div } from 'ui/components/common/base';
import InputControl from 'ui/components/common/InputControl';

const Container = styled(Div)`
  display: inline-flex;
  margin-right: 10px;
  position: relative;
`;

const Placeholder = styled(Div)`
  position: absolute;
  top: 3px;
  left: 6px;
  font-size: 13px;
  color: black;
  font-family: sans-serif !important;
`;

const Value = styled(Div)`
  position: relative;
  padding: ${(props) => props.smaller ? '0' : '2px'} 8px;
  user-select: none;
  background-color: ${(props) => props.isSelected ? props.theme.blue : '#f0f0f0'};
  color: ${(props) => props.isSelected ? 'white' : 'black'};
  cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  &:hover {
    background-color: ${(props) => props.isSelected ? props.theme.blue : props.theme.selectionBlue};
  }
  
  ${({ isDisabled }) => isDisabled ? 'color: #b6b6b6; cursor: default; background-color: #f0f0f0;' : ''}
`;

const Values = ({ values, disabledValues = [], selectedValue, other, startEditing, onChange, smaller }) => (
  <Container>
    {
      values.map((value) => (
        <Value key={ value }
               isSelected={ value === selectedValue }
               isDisabled={ disabledValues.indexOf(value) !== -1 }
               onClick={ () => onChange && onChange(value) }
               smaller={ smaller }>
          { value }
        </Value>
      ))
    }

    { other && <Value isSelected={ values.indexOf(selectedValue) < 0 } onClick={ startEditing }>Other...</Value> }
  </Container>
);

const StatusForm = styled.form`
  width: 219px;
  position: relative;
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 4px;
  right: 4px;
  display: block;
`;

const InputStyle = {
  'font-size': '13px',
  border: 'none',
  'background-color': '#f0f0f0',
  outline: '0',
  'border-radius': '4px',
  height: '24px',
  padding: '0 25px 0 6px',
  display: 'block',
  width: '100%',
  'box-sizing': 'border-box',
  color: 'black',
};

const InputFocusStyle = {
  border: '2px solid #b2c9ee',
  'box-sizing': 'border-box',
  padding: '0 4px'
};

class CustomValue extends React.Component {
  handleChange = (event) => {
    event.preventDefault();
    this.props.onChange(parseInt(this.elem.value, 10));
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onChange(this.props.selectedValue);
    } else {
      this.forceUpdate();
    }
  };

  setElem = (elem) => {
    this.elem = elem;

    if (elem) {
      elem.value = this.props.selectedValue;
      setTimeout(() => elem.focus(), 0);
      this.forceUpdate();
    }
  };

  renderMatches() {
    if (!this.elem) {
      return null;
    }

    const value = this.elem.value;

    if (!value) {
      return null;
    }

    try {
      const statusText = HttpStatusCodes.getStatusText(value);

      return `${value} ${statusText}`;
    } catch (ex) {
      return null;
    }
  }

  render() {
    return (
      <Container>
        <StatusForm onKeyUp={ this.handleKeyDown }>
          <Placeholder>{ this.renderMatches() }</Placeholder>
          <InputControl
            type="text"
            focusStyle={ InputFocusStyle }
            style={ InputStyle }
            onBlur={ this.handleChange }
            inputRef={ this.setElem }
            placeholder="Start typing an HTTP status code"/>
          <CloseIcon src="clear" onClick={ this.props.onClose }/>
        </StatusForm>
      </Container>
    );
  }
}

class SegmentedSelect extends React.Component {

  state = {
    editing: false
  };

  setEditing = (editing) => {
    this.setState({ editing });
  };

  updateValue = (value) => {
    this.props.onChange(value);
    this.setState({ editing: false });
  };

  render() {
    return this.state.editing
      ? <CustomValue onChange={ this.updateValue }
                     selectedValue={ this.props.selectedValue }
                     onClose={ () => this.setEditing(false) }/>
      : <Values { ...this.props } smaller={ this.props.smaller } startEditing={ () => this.setEditing(true) }/>
  }
}

export default SegmentedSelect;
