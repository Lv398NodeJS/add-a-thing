import axios from 'axios';
import {
  FETCH_TASK_DETAILS,
  UPDATE_TASK_DETAILS,
  DELETE_TASK_DETAILS,
  FETCH_SUBTASKLIST,
} from '@actions/actionTypes';

const fetchTaskDetails = taskId => (dispatch) => {
  axios
    .get(`/dashboards/dashboard/dashboardId/${taskId}`)
    .then((res) => {
      dispatch({
        type: FETCH_TASK_DETAILS,
        payload: res.data,
      });
      return axios.get(`/subtasks/${taskId}`);
    })
    .then(res => dispatch({
      type: FETCH_SUBTASKLIST,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

const deleteTaskDetails = taskId => (dispatch) => {
  axios
    .delete(`/dashboards/dashboard/${taskId}`)
    // eslint-disable-next-line no-unused-vars
    .then(res => dispatch({
      type: DELETE_TASK_DETAILS,
      payload: taskId,
    }))
    .catch(err => console.log(err));
};

const updateTaskDetails = updatedTaskDetails => (dispatch) => {
  axios
    .put(`/dashboards/dashboard/task/${updatedTaskDetails._id}`, updatedTaskDetails)
    .then(res => dispatch({
      type: UPDATE_TASK_DETAILS,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};


export {
  fetchTaskDetails, deleteTaskDetails, updateTaskDetails,
};
