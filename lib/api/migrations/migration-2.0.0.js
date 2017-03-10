import assign from 'lodash/assign';
import omit from 'lodash/omit';

const DEFAULT_SCENARIO = 'default-scenario';

export function migrate(data) {

  data.version = '2.0.0';

  assign(data, {
    mocks: createMocks(data.scenarios)
  });

  assign(data, {
    groups: createGroups(data.scenarios.filter((item) => item.id !== DEFAULT_SCENARIO))
  });

  return omit(data, 'scenarios');
}

function createGroups(scenarios) {
  return scenarios.map(({id, name, active}) => ({id, name, active}));
}

function createMocks(scenarios) {
  const mocks = [];
  scenarios.forEach((scenario) => {
    scenario.mockedRequests.forEach((request) => {
      request.groupId = scenario.id === DEFAULT_SCENARIO ? null : scenario.id;
      mocks.push(request);
    });
  });

  return mocks;
}