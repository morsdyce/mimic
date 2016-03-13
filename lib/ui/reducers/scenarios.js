import { API } from 'api';
import { FETCH_SCENARIOS_SUCCESS } from 'ui/constants/action-types';
import { fetchScenarios } from 'ui/actions/api';

const initialState = [];

export function scenarios(state = initialState, action) {

  switch (action.type) {
    case FETCH_SCENARIOS_SUCCESS:
      return [...action.payload];
  }

  return state;
}
