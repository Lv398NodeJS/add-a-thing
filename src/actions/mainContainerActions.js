import { FETCH_TASKLIST, TASKLIST_REF } from './actionTypes';
import { getTaskListAsArray } from '../components/Dashboard/MainContainer/utils';

export const fetchTaskList = taskListRef => async (dispatch) => {
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
});
