import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

const OptionsContainer = styled.div`
  border: ${(props) => props.theme.lightBorder};
  position: absolute;
  ${(props) => `${props.position}: 0`};
  width: 100%;
  z-index: 2147483646;
  background: #fff;
  max-height: 400px;
  overflow-y: auto;
  ${(props) => `${props.anchorPoint}: 100%;`}
`;

const Option = styled.div`
  display: flex;
  padding: ${(props) => props.withPadding ? '5px 5px 5px 32px' : '5px'};
  user-select: none;
  justify-content: center;
  ${(props) => props.align === 'center' ? 'justify-content: center' : 'justify-content: flex-start'};
  ${(props) => props.align === 'center' ? 'align-items: center' : 'align-items: flex-start'};
  ${(props) => props.isPadded ? 'padding-left: 25px;' : ''}

  &:hover {
    cursor: pointer;
    background-color: #c9dcf4;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

export class Autocomplete extends React.Component {

  state = {
    isOpen: false,
    value: ''
  };

  setValue = (option) => () => {
    this.setState({ value: option, isOpen: false });

    if (this.props.onChange) {
      this.props.onChange(option);
    }
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  renderDropdown() {
    const value = this.state.value.toLowerCase();
    const options = this.props.options.filter((option) => option.toLowerCase().indexOf(value) !== -1);

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
        <Input
          onChange={ (event) => this.setState({ value: event.target.value })}
          onFocus={ () => this.setState({ isOpen: true })}
          value={ this.state.value }
          type="text"/>
        { this.state.isOpen && this.renderDropdown() }
      </Container>
    );
  }

}

Autocomplete.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func
};

export default enhanceWithClickOutside(Autocomplete);
