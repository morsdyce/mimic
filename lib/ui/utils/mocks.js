import UIState from 'ui/UIState';
import API from 'api';

export function selectFirstMock() {
  const mock = API.mocks[0];

  if (mock.groupId) {
    const groups = UIState.groups.map((group) => {
      if (group.id === mock.groupId) {
        return { ...group, isOpen: true };
      }

      return group;
    });
    UIState.update({ selectedItems: [mock], groups });
  } else {
    UIState.update({ selectedItems: [mock] });
  }
}
