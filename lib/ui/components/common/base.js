import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// export class DivComponent extends React.Component {
//
//   bootstrap = (node) => {
//     if (!node) {
//       return;
//     }
//
//     this.targetElement = node;
//     const targetElement = document.createElement('mimic-div');
//     targetElement.className = this.props.className;
//     node.appendChild(targetElement);
//
//     debugger;
//     this.componentDidUpdate();
//   };
//
//   componentDidUpdate() {
//     // use special render function to preserve React context, in case children need it
//     ReactDOM.unstable_renderSubtreeIntoContainer(
//       /* parentComponent */ this,
//       <div style={{ all: 'initial'}}>{this.props.children}</div>,
//       this.targetElement
//     );
//   }
//
//   componentWillUnmount() {
//     ReactDOM.unmountComponentAtNode(this.targetElement);
//     // this.targetElement.remove();
//   }
//
//   render() {
//     return <div style={{ all:'initial' }} ref={ this.bootstrap }/>
//   }
// }

export const DivComponent = (props) => (
  <mimic-div class={ props.className } { ...props }>
    { props.children }
  </mimic-div>
);

export const SpanComponent = (props) => (
  <mimic-span class={ props.className } { ...props }>
    { props.children }
  </mimic-span>
);

export const Div = styled(DivComponent)`
  display: block;
`;

export const Span = styled(SpanComponent)`
  display: inline-block;
`;


