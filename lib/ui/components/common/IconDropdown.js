import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import Icon from 'ui/components/common/Icon';

const OptionsContainer = styled.div`
  box-shadow: 0 0 1px 1px rgba(0,0,0,0.2);
  border: ${(props) => props.theme.lightBorder};
  position: absolute;
  ${(props) => `${props.position}: 0`};
  width: 100px;
  z-index: 2147483646;
  background: #fff;
  max-height: 600px;
  overflow-y: auto;
  ${(props) => `${props.anchorPoint}: 100%;`}
`;

const Option = styled.div`
  display: flex;
  padding: ${(props) => props.withPadding ? '5px 5px 5px 32px' : '5px'};
  text-transform: capitalize;
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

const Container = styled.span`
  position: relative;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  ${(props) => props.active ? 'background-color: #427dd2;' : ''}
  ${(props) => props.active ? 'fill: white;' : ''}
  padding: 3px;
`;

const SelectedIcon = styled(Icon)`
  padding: 0 3px;
`;

export class IconDropdown extends React.Component {

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  };

  selectValue = (option) => () => {
    this.props.onChange && this.props.onChange(option);
  };

  renderOptions = () => {
    if (!this.state.isOpen) {
      return false;
    }

    const options = this.props.options.map((option) => (
      <Option key={ option }
              onClick={ this.selectValue(option) }
              withPadding={ this.props.valueIcon }
              align={ this.props.align }
              isPadded={ this.props.value && this.props.value !== option}>
        { this.props.value === option && <SelectedIcon src="check"/> }
        { option }
      </Option>
    ));

    return (
      <OptionsContainer innerRef={ this.autoScrollToEnd }
                        anchorPoint={ this.props.anchorPoint }
                        position={ this.props.position }>
        { options }
      </OptionsContainer>
    )
  };

  render() {
    const optionSelected = this.props.options.slice(1).some((option) => option === this.props.value);

    return (
      <Container isOpen={ this.state.isOpen } onClick={ this.toggle }>
        { this.renderOptions() }
        <StyledIcon src={ this.props.icon } active={ this.state.isOpen || optionSelected }/>
      </Container>
    );
  }

}

IconDropdown.defaultProps = {
  anchorPoint: 'top',
  position: 'left',
  align: 'center'
};

export default enhanceWithClickOutside(IconDropdown);
