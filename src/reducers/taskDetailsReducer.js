import {
  FETCH_TASK_DETAILS,
  UPDATE_TASK_DETAILS,
  DELETE_TASK_DETAILS,
} from '../actions/actionTypes';

const initialState = {
  taskDetails: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TASK_DETAILS:
      return {
        ...state,
        taskDetails: payload,
      };
    case UPDATE_TASK_DETAILS:
      return {
        ...state,
        taskDetails: payload,
      };
    case DELETE_TASK_DETAILS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
