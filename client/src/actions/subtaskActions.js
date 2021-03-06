import axios from 'axios';
import {
  FETCH_SUBTASKLIST,
  SET_SUBTASK_FILTER,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  DELETE_SUBTASK,
  ADD_TASK,
} from './actionTypes';

const fetchSubtaskList = taskId => (dispatch) => {
  axios.get(`/subtasks/${taskId}`)
    .then(res => dispatch({
      type: FETCH_SUBTASKLIST,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

const addSubtask = (subTask, taskId) => (dispatch) => {
  axios
    .post('/subtasks', { subTask, taskId })
    .then(res => dispatch({
      type: ADD_SUBTASK,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

const deleteSubtask = subtaskId => (dispatch) => {
  axios
    .delete(`/subtasks/${subtaskId}`)
    .then(() => dispatch({
      type: DELETE_SUBTASK,
      payload: subtaskId,
    }))
    .catch(err => console.log(err));
};

const updateSubtask = (updatedParam, subtaskId) => (dispatch) => {
  axios
    .put(`/subtasks/${subtaskId}`, updatedParam)
    .then(res => dispatch({
      type: UPDATE_SUBTASK,
      payload: res.data,
    }));
};

const convertToTask = (subtaskId, name, dashboardId) => (dispatch) => {
  axios
    .post(`/dashboards/dashboard/${dashboardId}`, name)
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
      return axios.delete(`/subtasks/${subtaskId}`);
    })
    .then(() => {
      dispatch({
        type: DELETE_SUBTASK,
        payload: subtaskId,
      });
    })
    .catch(err => console.log(err));
};

const setSubtaskFilter = filter => ({
  type: SET_SUBTASK_FILTER,
  payload: filter,
});

export {
  fetchSubtaskList, addSubtask, deleteSubtask, updateSubtask,
  convertToTask, setSubtaskFilter,
};
