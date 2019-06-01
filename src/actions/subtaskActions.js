import {
  FETCH_TASKSTATUS,
  FETCH_SUBTASKLIST,
  SET_SUBTASK_FILTER,
} from './actionTypes';
import { getSubtaskListAsArray } from '../components/Subtask/subtaskUtils';

const addSubtask = (taskRef, text) => () => {
  taskRef.child('subtaskList').push({ text, completed: false });
};

const deleteSubtask = (taskRef, subtaskId) => () => {
  taskRef.child(`subtaskList/${subtaskId}`).remove();
};

const changeSubtaskStatus = (taskRef, subtaskId) => () => {
  const subtaskRef = taskRef.child(`/subtaskList/${subtaskId}`);
  subtaskRef.once('value', (snapshot) => {
    subtaskRef.set({
      ...snapshot.val(),
      completed: !snapshot.val().completed,
    });
  });
};

const convertToTask = (taskRef, subtaskId, text) => () => {
  const subtaskRef = taskRef.child(`/subtaskList/${subtaskId}`);
  subtaskRef.remove().then(
    taskRef.parent.push({
      name: text,
      description: '',
      status: 'To Do',
      priority: 'Low',
    }),
  );
};

const setSubtaskFilter = filter => ({
  type: SET_SUBTASK_FILTER,
  payload: filter,
});

const fetchInfoForSubtaskList = taskRef => (dispatch) => {
  taskRef.on('value', (snapshot) => {
    const { status = '', subtaskList = {} } = snapshot.val() || {};
    dispatch({
      type: FETCH_SUBTASKLIST,
      payload: getSubtaskListAsArray(subtaskList),
    });
    dispatch({
      type: FETCH_TASKSTATUS,
      payload: status,
    });
  });
};

export {
  addSubtask, deleteSubtask, changeSubtaskStatus,
  convertToTask, setSubtaskFilter,
  fetchInfoForSubtaskList,
};
