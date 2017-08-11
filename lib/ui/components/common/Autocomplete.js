import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import { Div } from 'ui/components/common/base';
import InputControl from 'ui/components/common/InputControl';

const OptionsContainer = styled(Div)`
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.33);
  position: absolute;
  width: 100%;
  z-index: 2147483646;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled(Div)`
  display: flex;
  padding: ${(props) => props.withPadding ? '5px 5px 5px 32px' : '5px'};
  user-select: none;
  justify-content: center;
  ${(props) => props.align === 'center' ? 'justify-content: center' : 'justify-content: flex-start'};
  ${(props) => props.align === 'center' ? 'align-items: center' : 'align-items: flex-start'};
  ${(props) => props.isPadded ? 'padding-left: 25px;' : ''}

  &:hover {
    cursor: pointer;
  }
`;

const Container = styled(Div)`
  position: relative;
  width: 100%;
`;

const InputStyle = {
  border: 'none',
  outline: 'none',
  width: '100%',
  'font-size': '13px'
};

export class Autocomplete extends React.PureComponent {

  state = {
    isOpen: false,
    value: this.props.value
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  setValue = (option) => () => {
    this.setState({ isOpen: false, value: option });
    this.props.onChange(option);
    this.props.onBlur && this.props.onBlur(this.state.value);
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
    this.props.onChange(this.state.value);
    this.props.onBlur && this.props.onBlur(this.state.value);
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 9) {
      this.setState({ isOpen: false });
      this.props.onChange(this.state.value);
      this.props.onBlur && this.props.onBlur(this.state.value);
    }

    this.props.onKeyUp && this.props.onKeyUp(event);
  };

  closeSuggestions = () => {
    this.setState({ isOpen: false });
  };

  focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  renderDropdown() {
    const value = this.state.value.toLowerCase();
    const options = this.props.options
      .filter((option) => option.toLowerCase().indexOf(value) !== -1)
      .filter((option) => option.toLowerCase() !== value);

    if (!options.length) {
      return null;
    }

    return (
      <OptionsContainer>
        { options.map((option) => (
          <Option
            key={ option }
            onClick={ this.setValue(option) }>
            { option }
          </Option>
        ))}
      </OptionsContainer>
    )
  }

  render() {
    return (
      <Container>
        <InputControl
          style={ InputStyle }
          inputRef={ (node) => { this.input = node; } }
          onChange={ (event) => this.setState({ value: event.target.value}) }
          onFocus={ () => this.setState({ isOpen: true })}
          onKeyUp={ this.handleKeyUp }
          value={ this.state.value }
          type="text"/>
        { this.state.isOpen && this.renderDropdown() }
      </Container>
    );
  }

}

Autocomplete.defaultProps = {
  value: '',
  onChange: () => {}
};

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func
};

export default enhanceWithClickOutside(Autocomplete);
