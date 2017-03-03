import React from 'react';
import styled from 'styled-components';
import enhanceWithClickOutside from 'react-click-outside';
import Icon from 'ui/components/common/Icon';

const OptionsContainer = styled.div`
  border: ${(props) => props.theme.lightBorder};
  position: absolute;
  left: 0;
  width: 100px;
  z-index: 2147483646;
  background: #fff;
  max-height: 600px;
  overflow-y: auto;
  ${(props) => `${props.anchorPoint}: 100%;`}
`;

const Option = styled.div`
  padding: ${(props) => props.withPadding ? '5px 5px 5px 32px' : '5px'};
  user-select: none;
  justify-content: center;
  display: flex;

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
  padding: 3px;
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

  selectValue = (option) => {
    const { onChange } = this.props;

    return () => {
      onChange && onChange(option.value);
    }
  };

  renderOptions = () => {
    if (!this.state.isOpen) {
      return false;
    }

    const options = this.props.options.map((option) => {
      return (
      <Option key={ option.value } onClick={ this.selectValue(option) } withPadding={ this.props.valueIcon }>
        { option.label }
      </Option>
    );
    });

    return (
      <OptionsContainer innerRef={ this.autoScrollToEnd } anchorPoint={ this.props.anchorPoint }>
        { options }
      </OptionsContainer>
    )
  };

  render() {
    return (
      <Container isOpen={ this.state.isOpen } onClick={ this.toggle }>
        { this.renderOptions() }
        <StyledIcon src={ this.props.icon } active={ this.state.isOpen }/>
      </Container>
    );
  }

}

IconDropdown.defaultProps = {
  anchorPoint: 'top'
};

export default enhanceWithClickOutside(IconDropdown);
