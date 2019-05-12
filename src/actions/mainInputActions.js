import { ADD_TASK } from './actionTypes';

const addTask = ({ newTask }) => ({
  type: ADD_TASK,
  payload: { newTask },
});

export { addTask };
