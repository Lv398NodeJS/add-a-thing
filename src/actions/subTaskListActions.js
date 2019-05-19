import {
  FETCH_TASKSTATUS, FETCH_SUBTASKLIST,
} from './actionTypes';
import { getSubtaskListAsArray } from '../components/SubTaskList/SubTaskListUtils';

const addSubTask = (taskRef, text) => async () => {
  taskRef.child('subtaskList').push({ text, completed: false });
};

const deleteSubTask = (taskRef, subtaskId) => async () => {
  taskRef.child(`subtaskList/${subtaskId}`).remove();
};

const changeSubTaskStatus = (taskRef, subtaskId) => async () => {
  const subtaskRef = taskRef.child(`/subtaskList/${subtaskId}`);
  subtaskRef.once('value', (snapshot) => {
    subtaskRef.set({
      ...snapshot.val(),
      completed: !snapshot.val().completed,
    });
  });
};

const convertToTask = (taskRef, subtaskId, text) => async () => {
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

const fetchTaskStatus = taskRef => (dispatch) => {
  taskRef.on('value', (snapshot) => {
    const { status = '' } = snapshot.val() || {};
    dispatch({
      type: FETCH_TASKSTATUS,
      payload: status,
    });
  });
};

const fetchSubTaskList = taskRef => (dispatch) => {
  taskRef.on('value', (snapshot) => {
    const { subtaskList = {} } = snapshot.val() || {};
    dispatch({
      type: FETCH_SUBTASKLIST,
      payload: getSubtaskListAsArray(subtaskList),
    });
  });
};

export {
  addSubTask, deleteSubTask, changeSubTaskStatus, convertToTask, fetchTaskStatus, fetchSubTaskList,
};
