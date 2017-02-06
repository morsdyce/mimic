import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import find from 'lodash/find';
import get from 'lodash/get';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const OptionsContainer = styled.div`
  font-size: 14px;
  border: 1px solid #e7e7e7;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 50;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  bottom: 100%;
`;

const Option = styled.div`
  padding: 5px;
  
  &:hover {
    cursor: pointer;
    background-color: #c9dcf4;
  }
`;

const Container = styled.div`
  position: relative;
  cursor: pointer;
  height: 100%;
  padding: 0 6px 0 8px;
  background-color: ${(props) => props.isOpen ? '#f0f0f0' : 'white'};
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;
`;

const Icon = styled.img`
  height: 16px;
  user-select: none;
  align-self: center;
  cursor: pointer;
`;

const CustomIcon = styled(Icon)`
  margin-right: 8px;
`;

const DropdownIcon = styled(Icon)`
  margin-left: 4px;
`;

export class Select extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle      = this.toggle.bind(this);
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
    }
  }

  renderOptions() {
    if (!this.state.isOpen) {
      return false;
    }

    const options = this.props.options.map((option) => {
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

    return (
      <ValueContainer>
        { this.props.valueIcon && <CustomIcon src={ this.props.valueIcon }/> }

        {
          this.props.valueComponent
            ? <this.props.valueComponent { ...selectedOption }/>
            : get(selectedOption, 'label', null)
        }

        { this.props.showDropdownIcon && <DropdownIcon src={ selectIcon } alt="Select"/> }
      </ValueContainer>
    );
  }

  render() {
    return (
      <Container isOpen={ this.state.isOpen } onClick={ this.toggle }>
        { this.renderOptions() }
        { this.renderValue() }
      </Container>
    );
  }

}

Select.defaultProps = {
  showDropdownIcon: true
};

Select.propTypes = {};

export default enhanceWithClickOutside(Select);
