import {
  FETCH_TASKSTATUS,
  FETCH_SUBTASKLIST,
  SET_SUBTASK_FILTER,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  DELETE_SUBTASK,
} from '@actions/actionTypes';
import { SHOW_ALL } from '@Subtask/subtaskFilterTypes';

const initialState = {
  taskStatus: '',
  subtaskList: [],
  currentFilter: SHOW_ALL,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TASKSTATUS:
      return {
        ...state,
        taskStatus: payload,
      };
    case DELETE_SUBTASK:
      return {
        ...state,
        subtaskList: state.subtaskList.filter(subtask => subtask._id !== payload),
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
    case ADD_SUBTASK:
      return {
        ...state,
        subtaskList: [...state.subtaskList, payload],
      };
    case UPDATE_SUBTASK:
      return {
        ...state,
        subtaskList: state.subtaskList.map((subtask) => {
          if (subtask._id === payload._id) {
            return { ...payload };
          }
          return subtask;
        }),
      };
    default:
      return state;
  }
};
