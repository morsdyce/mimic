import React from 'react';
import Group from 'ui/components/Group';
import Mock from 'ui/components/Mock';
import API from 'api';
import some from 'lodash/some';
import EVENTS from 'api/constants/events';

class MockedRequests extends React.Component {

  componentDidMount() {
    API.on(EVENTS.UPDATE_MOCK, this.reRender);
    API.on(EVENTS.UPDATE_GROUP, this.reRender);
  }

  componentWillUnmount() {
    API.off(EVENTS.UPDATE_MOCK, this.reRender);
    API.off(EVENTS.UPDATE_GROUP, this.reRender);
  }

  reRender = () => {
    this.forceUpdate();
  };

  selectMock = (mock) => {
    return (event) => {
      event.stopPropagation();

      const multiple = event.metaKey || event.ctrlKey;

      this.props.selectMock(mock, multiple);
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

      API.toggleMock(mock.id);
    }
  };

  toggleGroup(group) {
    return (event) => {
      event.stopPropagation();

      API.toggleGroup(group.id);
    }
  }

  getMocks() {
    return API.mocks
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
          isSelected={ this.props.selectedMocks.indexOf(mock) > -1 }
          toggleMock={ this.toggleMock(mock) }
          onClick={ this.selectMock(mock) }/>
      ));
  }

  getGroups() {
    return API.groups
      .filter((group) =>  {
        if (!this.props.searchTerm) {
          return true;
        }

        if (group.name.indexOf(this.props.searchTerm) !== -1) {
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
          selectedMocks={ this.props.selectedMocks }
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

export default MockedRequests;
