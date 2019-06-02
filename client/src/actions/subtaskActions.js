import axios from 'axios';
import {
  SET_SUBTASK_FILTER,
  ADD_SUBTASK,
  UPDATE_SUBTASK,
  DELETE_SUBTASK,
  ADD_TASK,
} from '@actions/actionTypes';

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
    // eslint-disable-next-line no-unused-vars
    .then(res => dispatch({
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
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
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
  addSubtask, deleteSubtask, updateSubtask,
  convertToTask, setSubtaskFilter,
};
