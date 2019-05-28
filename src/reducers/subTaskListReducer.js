import {
  FETCH_TASKSTATUS, FETCH_SUBTASKLIST, SET_SUBTASK_FILTER,
} from '../actions/actionTypes';
import { subtaskFilterTypes } from '../components/SubTaskList/subTaskFilterTypes';

const initialState = {
  taskStatus: '',
  subtaskList: [],
  filter: subtaskFilterTypes.SHOW_ALL,
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
    case SET_SUBTASK_FILTER:
      return {
        ...state,
        filter: payload,
      };
    default:
      return state;
  }
};
