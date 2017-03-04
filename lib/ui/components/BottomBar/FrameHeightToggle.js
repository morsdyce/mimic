import React from 'react';
import styled from 'styled-components';
import UIState from 'ui/states/UIState';
import Icon from 'ui/components/common/Icon';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  cursor: pointer;
  user-select: none;
`;

const goFullSize = () => UIState.setEditorHeight(window.innerHeight);
const goHalfSize = () => UIState.setEditorHeight(400);

const FrameHeightToggle = () => {
  const belowFullSize = UIState.editorHeight < (window.innerHeight - 50);

  return (
    <Container onClick={ belowFullSize ? goFullSize : goHalfSize }>
      <Icon src={ belowFullSize ? 'fullScreen' : 'halfScreen' }/>
    </Container>
  );
};

export default FrameHeightToggle;
