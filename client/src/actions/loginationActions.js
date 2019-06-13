import axios from 'axios';
import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  LOGGED_DATA,
  FETCH_DASHES,
} from './actionTypes';

export const registerUser = newUserData => (dispatch) => {
  axios
    .post('/users/registerUser', newUserData)
    .then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: { ...res.data },
      });
    })
    .catch(err => console.log(err));
};

export const loginUser = userData => async (dispatch) => {
  axios
    .post('/users/loginUser/', userData)
    .then((res) => {
       dispatch({
        type: LOG_IN_USER,
        payload: { ...res.data },
      });
      return axios
        .get(`/dashboards/${res.data[0]._id}`);
    })
    .then(res => dispatch({
      type: FETCH_DASHES,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

export const loggedIn = loggedData => (dispatch) => {
  dispatch({
    type: LOGGED_DATA,
    payload: loggedData,
  });
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT_USER,
  });
};
