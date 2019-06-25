import {
  FETCH_TASKLIST,
  FETCH_DASHBOARD_NAME_IN_TASKLIST,
  ADD_TASK,
  DELETE_TASK_DETAILS,
  UPDATE_TASK_DETAILS,
} from '@actions/actionTypes';

const initialState = {
  taskList: [],
  dashboardName: '',
  loading: true,
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
    case FETCH_DASHBOARD_NAME_IN_TASKLIST:
      return {
        ...state,
        dashboardName: payload,
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
