import React from 'react';
import styled from 'styled-components';
import some from 'lodash/some';
import mockedIcon from 'ui/assets/images/mocked@2x.png';
import unmockedIcon from 'ui/assets/images/unmocked@2x.png';
import expandIcon from 'ui/assets/images/right@2x.png';
import Mock from 'ui/components/Mock';
import { DropTarget } from 'react-dnd';
import { compose } from 'recompose';
import withAPI from 'ui/components/withAPI';

const groupTarget = {
  drop(props, monitor) {
    const mockId = monitor.getItem().id;
    const mock = props.API.getMock(mockId);

    if (mock) {
      props.API.updateMock(mockId, { ...mock, groupId: props.id });
    }
  }
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isHovered: monitor.isOver()
  };
}

const Icon = styled.img`
  height: 16px;
  user-select: none;
  margin-right: 5px;
  ${(props) => props.open ? 'transform: rotate(90deg);' : ''}
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.isSelected ? '#cbddf5' : 'white'};
  
  &:hover {
    cursor: ${(props) => props.isSelected ? 'default' : 'pointer'};
    background-color: #cbddf5;
  }
`;

const GroupMocks = styled.div`
  margin-left: 20px;
`;

const MocksCount = styled.sup`
  margin-left: 3px;
  font-size: 10px;
`;

export class Group extends React.Component {

  state = {
    isOpen: false,
    lastState: null
  };

  toggle = (event) => {
    event.stopPropagation();

    this.setState({ isOpen: !this.state.isOpen });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.checkMockMatch(nextProps.searchTerm || null);
    }
  }

  checkMockMatch(searchTerm) {
    const hasMatches = some(this.props.mocks, (mock) => mock.url.indexOf(searchTerm) > -1);

    if (hasMatches && !this.state.isOpen) {
      this.setState({
        isOpen: true,
        lastState: this.state.isOpen
      });
    }

    if (!hasMatches && this.state.lastState !== null) {
      this.setState({
        isOpen: this.state.lastState,
        lastState: null
      });
    }
  }

  render() {
    const { name, active, mocks, searchTerm, selectedMock, onSelectMock, onClick, connectDropTarget } = this.props;

    return connectDropTarget(
      <div onClick={ onClick }>
        <GroupHeader>
          <Icon src={ active ? mockedIcon : unmockedIcon } onClick={ this.props.toggleGroup }/>
          <Icon src={ expandIcon } onClick={ this.toggle } open={ this.state.isOpen }/>
          { name } <MocksCount>{ mocks.length }</MocksCount>
        </GroupHeader>
        <GroupMocks>
          { this.state.isOpen && mocks.map((mock) => (
            <Mock
              key={ mock.id }
              id={ mock.id }
              name={ mock.name }
              active={ mock.isActive }
              method={ mock.method }
              url={ mock.url }
              searchTerm={ searchTerm }
              isSelected={ mock === selectedMock }
              toggleMock={ this.props.toggleMock(mock) }
              onClick={ onSelectMock(mock) }/>
          ))}
        </GroupMocks>
      </div>
    )
  }
}

Group.propTypes = {
  name: React.PropTypes.string,
  active: React.PropTypes.bool,
  mocks: React.PropTypes.array
};

export default compose(
  withAPI,
  DropTarget('mock', groupTarget, collect)
)(Group);
