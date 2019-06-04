import axios from 'axios';
import { ADD_DASHBOARD, DELETE_DASHBOARD, FETCH_DASHES } from './actionTypes';

const fetchDashes = userID => (dispatch) => {
  axios
    .get(`/dashboards/${userID}`)
    .then(res => dispatch({
      type: FETCH_DASHES,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

const addDashboard = dashboard => (dispatch) => {
  axios
    .post('/dashboards', dashboard)
    .then(res => dispatch({
      type: ADD_DASHBOARD,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};


const deleteDashboard = id => (dispatch) => {
  axios
    .delete(`/dashboards/${id}`)
    // eslint-disable-next-line no-unused-vars
    .then(res => dispatch({
      type: DELETE_DASHBOARD,
      payload: id,
    }))
    .catch(err => console.log(err));
};

export { addDashboard, deleteDashboard, fetchDashes };
