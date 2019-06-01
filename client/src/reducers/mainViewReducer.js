import initialState from './initialState';
import { ADD_DASHBOARD, DELETE_DASHBOARD, FETCH_DASHES } from '../actions/actionTypes';

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_DASHBOARD:
      return {
        ...state,
        dashboards: [payload, ...state.dashboards],
      };
    case DELETE_DASHBOARD:
      return {
        ...state,
        dashboards: state.dashboards.filter(dashboard => dashboard._id !== payload),
      };
    case FETCH_DASHES:
      return {
        ...state,
        dashboards: payload,
      };
    default:
      return state;
  }
};
