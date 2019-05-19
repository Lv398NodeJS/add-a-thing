import {
  FETCH_TASKSTATUS, FETCH_SUBTASKLIST,
} from '../actions/actionTypes';

const initialState = {
  taskStatus: '',
  subtaskList: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TASKSTATUS:
      return {
        ...state,
        taskStatus: payload,
      };
    case FETCH_SUBTASKLIST:
      return {
        ...state,
        subtaskList: payload,
      };
    default:
      return state;
  }
};
