import React from 'react';
import Group from 'ui/components/Group';
import Mock from 'ui/components/Mock';

class MockedRequests extends React.Component {

  selectMock = (mock) => {
    return () => this.props.selectMock(mock);
  };

  getMocks() {
    return this.props.API.mocks
      .filter((mock) => !mock.groupId)
      .map((mock) => (
        <Mock
          key={ mock.id }
          id={ mock.id }
          name={ mock.name }
          active={ mock.isActive }
          method={ mock.method }
          url={ mock.url }
          isSelected={ mock === this.props.selectedMock }
          onClick={ this.selectMock(mock) }/>
      ));
  }

  getGroups() {
    return this.props.API.groups
      .map((group) => (
        <Group
          key={ group.id }
          id={ group.id }
          name={ group.name }
          active={ group.active }
          mocks={ group.mocks }
          selectedMock={ this.props.selectedMock }
          onSelectMock={ this.selectMock }/>
      ));
  }

  render() {
    return (
      <div>
        { this.getGroups() }
        { this.getMocks() }
      </div>
    );
  }
}

export default MockedRequests;
