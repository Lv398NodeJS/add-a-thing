import { FETCH_TASKLIST, TASKLIST_REF } from '../actions/actionTypes';

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
    default:
      return state;
  }
};
