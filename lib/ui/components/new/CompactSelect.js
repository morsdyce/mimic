import React from 'react';

class CompactSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.options[0].value
    };

    this.openSelect = this.openSelect.bind(this);
    this.onChange   = this.onChange.bind(this);
  }

  openSelect() {
    this.selectInput.click();
  }

  onChange(event) {
    this.setState({
      selectedValue: event.target.value
    });
  }

  render() {
    return (
      <span onClick={ this.openSelect }>
        { this.state.selectedValue }

        <select ref={ (element) => this.selectInput = element } onChange={ this.onChange }>
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
