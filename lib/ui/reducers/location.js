import { NAVIGATE } from 'ui/constants/action-types';

const initialState = {
  component: 'scenarios',
  props: {}
};

export function location(state = initialState, action) {

  if (action.type === NAVIGATE) {
    return Object.assign({}, state, {
      component: action.component,
      props: action.payload || {}
    });
  }

  return state;
}

