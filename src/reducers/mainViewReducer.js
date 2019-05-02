import initialState from './initialState';
import { ADD_DASHBOARD, DELETE_DASHBOARD, FETCH_DASHES } from '../actions/actionTypes';

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_DASHBOARD:
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          payload,
        },
      };
    case DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: delete payload.id,
      };
    case FETCH_DASHES:
      return {
        ...state,
        dashboards: action.payload,
      };
    default:
      return state;
  }
};
