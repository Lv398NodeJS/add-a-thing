import { FETCH_TASKLIST, TASKLIST_REF, ADD_TASK } from './actionTypes';
import { getTaskListAsArray } from '../components/Dashboard/MainContainer/MainContainerUtils';

export const fetchTaskList = taskListRef => (dispatch) => {
  taskListRef.on('value', (snapshot) => {
    const taskListSnap = snapshot.val() ? snapshot.val() : {};
    dispatch({
      type: FETCH_TASKLIST,
      payload: getTaskListAsArray(taskListSnap),
    });
  });
};

export const setTaskListRef = taskListRef => ({
  type: TASKLIST_REF,
  payload: taskListRef,
}
);

export const newTask = task => ({
  type: ADD_TASK,
  payload: task,
});