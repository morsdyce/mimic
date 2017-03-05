import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';

const OptionsContainer = styled.div`
  border: ${(props) => props.theme.lightBorder};
  position: absolute;
  width: 100%;
  z-index: 2147483646;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
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
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 13px;
`;

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
    this.props.onBlur && this.props.onBlur();
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
    this.props.onChange(this.state.value);
    this.props.onBlur && this.props.onBlur();
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
        <Input
          onChange={ (event) => this.setState({ value: event.target.value}) }
          onFocus={ () => this.setState({ isOpen: true })}
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
  options: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
};

export default enhanceWithClickOutside(Autocomplete);
