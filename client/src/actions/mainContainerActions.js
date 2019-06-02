import axios from 'axios';
import { FETCH_TASKLIST, ADD_TASK } from './actionTypes';

export const fetchTaskList = id => (dispatch) => {
  axios
    .get(`/dashboards/dashboard/${id}`)
    .then(res => dispatch({
      type: FETCH_TASKLIST,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

export const addTask = task => (dispatch) => {
  const dashboardId = document.URL.split('/').pop();
  axios
    .post(`/dashboards/dashboard/${dashboardId}`, task)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      dispatch({
        type: ADD_TASK,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
