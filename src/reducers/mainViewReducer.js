import initialState from './initialState';
import { ADD_DASHBOARD, DELETE_DASHBOARD, FETCH_DASHBOARD } from '../actions/actionTypes';

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_DASHBOARD:
      console.log('FETCH_STUFF Action');
      return action;
    case DELETE_DASHBOARD:
      newState = action.dashboards;
      console.log('RECEIVE_STUFF Action');
      return newState;
    case FETCH_DASHBOARD:
      newState = action.dashboards;
      return newState;
    default:
      return state;
  }
};
