import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import find from 'lodash/find';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const OptionsContainer = styled.div`
  font-size: 14px;
  border: 1px solid #e7e7e7;
  position: absolute;
  bottom: 26px;
  left: -7px;
  width: 500px;
  z-index: 50;
  background: #fff;
`;

const Option = styled.div`
  padding: 5px;
`;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const ValueContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const iconStyle = {
  height: '16px',
  userSelect: 'none',
  alignSelf: 'center',
  cursor: 'pointer'
};

export class Select extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.selectValue = this.selectValue.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }

  selectValue(option) {
    const { onChange } = this.props;

    return () => {
      onChange && onChange(option.value);
      this.toggle();
    }
  }

  renderOptions() {
    if (!this.state.isOpen) {
      return false;
    }

    const options =  this.props.options.map((option) => {
      if (this.props.optionComponent) {
        const OptionComponent = this.props.optionComponent;
        return <OptionComponent key={ option.value } onClick={ this.selectValue(option) } { ...option }/>;
      }

      return <Option key={ option.value }>{ option.label }</Option>
    });

    return (
      <OptionsContainer>
        { options }
      </OptionsContainer>
    )
  }

  renderValue() {
    const selectedOption = find(
      this.props.options, { value: this.props.value }
    );

    if (this.props.valueComponent) {
      const ValueRenderer = this.props.valueComponent;
      return <ValueRenderer onClick={ this.toggle } { ...selectedOption }/>
    }

    return (
      <ValueContainer onClick={ this.toggle }>
        { selectedOption ? selectedOption.label : null }
        <img src={ selectIcon } style={ iconStyle } alt="Select"/>
      </ValueContainer>
    );
  }

  render() {
    return (
      <Container>
        {  this.renderOptions() }
        { this.renderValue() }
      </Container>
    );
  }

}

Select.propTypes = {

};

export default enhanceWithClickOutside(Select);
