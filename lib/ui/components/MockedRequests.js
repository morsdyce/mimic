import React from 'react';
import Group from 'ui/components/Group';
import Mock from 'ui/components/Mock';
import withAPI from 'ui/components/withAPI';
import some from 'lodash/some';

class MockedRequests extends React.Component {

  selectMock = (mock) => {
    return (event) => {
      event.stopPropagation();

      this.props.selectMock(mock);
    }
  };

  selectGroup = (group) => {
    return (event) => {
      event.stopPropagation();

      this.props.selectGroup(group);
    }
  };

  toggleMock = (mock) => {
    return (event) => {
      event.stopPropagation();

      this.props.API.toggleMock(mock.id);
      this.forceUpdate();
    }
  };

  toggleGroup(group) {
    return (event) => {
      event.stopPropagation();

      this.props.API.toggleGroup(group.id);
      this.forceUpdate();
    }
  }

  getMocks() {
    return this.props.API.mocks
      .filter((mock) => !mock.groupId)
      .filter((mock) => mock.url.indexOf(this.props.searchTerm) !== -1)
      .map((mock) => (
        <Mock
          key={ mock.id }
          id={ mock.id }
          name={ mock.name }
          active={ mock.isActive }
          method={ mock.method }
          url={ mock.url }
          searchTerm={ this.props.searchTerm }
          isSelected={ mock === this.props.selectedMock }
          toggleMock={ this.toggleMock(mock) }
          onClick={ this.selectMock(mock) }/>
      ));
  }

  getGroups() {
    return this.props.API.groups
      .filter((group) =>  {
        if (!this.props.searchTerm) {
          return true;
        }

        return some(group.mocks, (mock) => mock.url.indexOf(this.props.searchTerm) !== -1)
      })
      .map((group) => (
        <Group
          key={ group.id }
          id={ group.id }
          name={ group.name }
          active={ group.active }
          mocks={ group.mocks }
          selectedMock={ this.props.selectedMock }
          searchTerm={ this.props.searchTerm }
          toggleGroup={ this.toggleGroup(group) }
          toggleMock={ this.toggleMock }
          onSelectMock={ this.selectMock }
          onClick={ this.selectGroup(group) }/>
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

export default withAPI(MockedRequests);
