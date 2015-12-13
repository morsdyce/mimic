import React   from 'react';
import bdsmImg from 'ui/assets/images/bdsm-label.png';

export class UIToggle extends React.Component {

  static get propTypes() {
    return {
      onToggle: React.PropTypes.func.isRequired
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      style: {
        cursor: 'pointer',
        opacity: '0',
        transition: 'opacity .5s, box-shadow .15s',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999999
      }
    }
  }

  _updateStyle(newStyle) {
    const style = Object.assign({}, this.state.style, newStyle);

    this.setState({ style });
  }

  _onMouseEnter() {
    this._updateStyle({ boxShadow: '0 8px 7px -7px rgba(0, 0, 0, .7)' });
  }

  _onMouseLeave() {
    this._updateStyle({ boxShadow: 'initial' });
  }

  _onClick() {
    this.props.onToggle();
  }

  componentDidMount() {
    setTimeout(() => {
      this._updateStyle({ opacity: '1' });
    })
  }

  render() {
    return (
      <img src={ bdsmImg }
           alt="Toggle BDSM"
           style={ this.state.style }
           onMouseEnter={ this._onMouseEnter.bind(this) }
           onMouseLeave={ this._onMouseLeave.bind(this) }
           onClick={ this._onClick.bind(this) }/>
    );
  }
}
