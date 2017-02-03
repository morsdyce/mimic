import React from 'react';
import selectIcon from 'ui/assets/images/up-down@2x.png';

const containerStyle = {
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  height: '16px'
};

class CompactSelect extends React.Component {

  constructor(props) {
    super(props);

    this.onChange   = this.onChange.bind(this);
    this.openSelect = this.openSelect.bind(this);
  }

  openSelect() {
    this.selectInput.click();
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <span style={ containerStyle } onClick={ this.openSelect }>
        { this.props.value }
        <img src={ selectIcon } style={ iconStyle } alt="Select"/>

        <select
          ref={ (element) => this.selectInput = element }
          onChange={ this.onChange }
          value={ this.props.value }>
          {
            this.props.options.map(({ value, label }) => (
              <option key={ value } value={ value }>{ label }</option>
            ))
          }
        </select>
      </span>
    );
  }
}

export default CompactSelect;
