import React   from 'react';
import bdsmImg from 'ui/assets/images/bdsm-label.png';
import positionTopLeft from 'ui/assets/images/position-top-left.png';
import positionTopRight from 'ui/assets/images/position-top-right.png';
import positionBottomLeft from 'ui/assets/images/position-bottom-left.png';
import positionBottomRight from 'ui/assets/images/position-bottom-right.png';

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
        zIndex: 2147483647
      },
      iconStyle: {
        width: '16px',
        margin: '4px 3px 0'
      },
      actionsStyle: {
        background: '#efefef',
        padding: '2px 0',
        borderTop: '1px solid #e5e5e5',
        borderLeft: '1px solid #e5e5e5',
        borderRight: '1px solid #e5e5e5',
        textAlign: 'center',
        opacity: 0,
        transition: 'opacity .5s',
      }
    }
  }

  _updateStyle({ main = {}, icon = {}, actions = {} }) {
    const style = Object.assign({}, this.state.style, main);
    const iconStyle = Object.assign({}, this.state.iconStyle, icon);
    const actionsStyle = Object.assign({}, this.state.actionsStyle, actions);

    console.log(style);
    this.setState({ style, iconStyle, actionsStyle });
  }

  _onMouseEnter() {
    this._updateStyle({
      main: { boxShadow: '0 8px 14px -7px rgba(0, 0, 0, .7)' },
      actions: { opacity: 1 }
    });
  }

  _onMouseLeave() {
    this._updateStyle({
      main: { boxShadow: 'initial' },
      actions: { opacity: 0 }
    });
  }

  _onClick() {
    this.props.onToggle();
  }

  _setPosition(position = 'bottom-right') {
    let newStyle = Object.assign({}, this.state.style);
    this._clearPositions(newStyle);

    let newPosition;
    const gap = '20px';

    switch(position) {
      case 'bottom-left':
        newPosition = {
          bottom: gap,
          left: gap
        };
        break;

      case 'top-right':
        newPosition = {
          top: gap,
          right: gap
        };
        break;

      case 'top-left':
        newPosition = {
          top: gap,
          left: gap
        };
        break;

      case 'bottom-right':
      default:
        newPosition = {
          bottom: gap,
          right: gap
        };
    }

    this.setState({
      style: Object.assign({}, newStyle, newPosition)
    });
  }

  _clearPositions(style) {
    delete style.top;
    delete style.bottom;
    delete style.left;
    delete style.right;
  }

  componentDidMount() {
    setTimeout(() => {
      this._updateStyle({ main: { opacity: '1' }});
    })
  }

  render() {
    return (
      <div style={ this.state.style }
           onMouseEnter={ this._onMouseEnter.bind(this) }
           onMouseLeave={ this._onMouseLeave.bind(this) }>
        <div style={ this.state.actionsStyle }>
          <span onClick={ () => this._setPosition('top-left') }><img style={ this.state.iconStyle } src={positionTopLeft} /></span>
          <span onClick={ () => this._setPosition('bottom-left') }><img style={ this.state.iconStyle } src={positionBottomLeft} /></span>
          <span onClick={ () => this._setPosition('bottom-right') }><img style={ this.state.iconStyle } src={positionBottomRight} /></span>
          <span onClick={ () => this._setPosition('top-right') }><img style={ this.state.iconStyle } src={positionTopRight} /></span>
        </div>
        <img src={ bdsmImg }
             alt="Toggle BDSM"
             onClick={ this._onClick.bind(this) } />
      </div>
    );
  }
}
