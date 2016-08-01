import React   from 'react';
import bdsmImg from 'ui/assets/images/bdsm-label.png';
import Draggable from 'react-draggable';
import { saveToggleCoordinates, getToggleCoordinates } from 'ui/utils/storage';

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
        background: `url('${bdsmImg}')`,
        width: '94px',
        height: '48px',
        cursor: 'pointer',
        opacity: '0',
        transition: 'opacity .5s, box-shadow .15s',
        position: 'fixed',
        zIndex: 2147483647
      }
    };

    const savedCoordinates = getToggleCoordinates();

    if (savedCoordinates) {
      this.state.style.left = savedCoordinates.x;
      this.state.style.top = savedCoordinates.y;
    } else {
      this.state.style.bottom = '20px';
      this.state.style.right = '20px';
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
    if (!this.dragging) {
      this.props.onToggle();
    }
  }

  _onDragStart() {
    this.dragging = true;
  }

  _onDragStop(event) {
    const { pageX, pageY, offsetX, offsetY } = event;
    saveToggleCoordinates(pageX - offsetX, pageY - offsetY);

    setTimeout(() => {
      this.dragging = false;
    }, 200);
  }

  componentDidMount() {
    setTimeout(() => {
      this._updateStyle({ opacity: '1' });
    });
  }

  render() {
    return (
      <Draggable
        handle=".bdsm-handle"
        onStart={this._onDragStart.bind(this)}
        onStop={this._onDragStop.bind(this)}
        offsetParent={ document.body }>
        <div className="bdsm-handle"
             src={ bdsmImg }
             alt="Toggle BDSM"
             style={ this.state.style }
             onMouseEnter={ this._onMouseEnter.bind(this) }
             onMouseLeave={ this._onMouseLeave.bind(this) }
             onClick={ this._onClick.bind(this) } />
      </Draggable>

    );
  }
}
