import {
  FETCH_TASKSTATUS, FETCH_SUBTASKLIST,
} from './actionTypes';
import { getSubtaskListAsArray } from '../components/SubTaskList/SubTaskListUtils';

const addSubTask = (taskRef, text) => () => {
  taskRef.child('subtaskList').push({ text, completed: false });
};

const deleteSubTask = (taskRef, subtaskId) => () => {
  taskRef.child(`subtaskList/${subtaskId}`).remove();
};

const changeSubTaskStatus = (taskRef, subtaskId) => () => {
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

const fetchInfoForSubTaskList = taskRef => (dispatch) => {
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
  addSubTask, deleteSubTask, changeSubTaskStatus, convertToTask, fetchInfoForSubTaskList,
};