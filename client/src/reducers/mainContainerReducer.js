import {
  FETCH_TASKLIST,
  TASKLIST_REF,
  ADD_TASK,
  DELETE_TASK_DETAILS,
  UPDATE_TASK_DETAILS,
} from '../actions/actionTypes';

const initialState = {
  taskList: [],
  loading: true,
  taskListRef: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TASKLIST:
      return {
        ...state,
        taskList: payload,
        loading: false,
      };
    case TASKLIST_REF:
      return {
        ...state,
        taskListRef: payload,
      };
    case ADD_TASK:
      return {
        ...state,
        taskList: [
          ...state.taskList, payload,
        ],
      };
    case DELETE_TASK_DETAILS:
      return {
        ...state,
        taskList: state.taskList.filter(task => task._id !== payload),
      };
    case UPDATE_TASK_DETAILS:
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task._id === payload._id) {
            return { ...payload };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};