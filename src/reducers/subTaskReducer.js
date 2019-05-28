import {
  FETCH_TASKSTATUS, FETCH_SUBTASKLIST, SET_SUBTASK_FILTER,
} from '../actions/actionTypes';
import { subtaskFilterTypes } from '../components/SubTask/subTaskFilterTypes';

const initialState = {
  taskStatus: '',
  subtaskList: [],
  currentFilter: subtaskFilterTypes.SHOW_ALL,
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
        currentFilter: payload,
      };
    default:
      return state;
  }
};
