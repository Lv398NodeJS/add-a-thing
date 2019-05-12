import { ADD_TASK } from '../actions/actionTypes';

const initialState = {
  taskList: [],
};

export default (state = initialState, action) => {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: [
          ...state.taskList,
          payload,
        ],
      };
    default:
      return state;
  }
};
