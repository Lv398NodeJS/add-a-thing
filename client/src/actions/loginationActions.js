import axios from 'axios';
import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  FETCH_DASHES,
  LOGGED_IN_USER,
} from './actionTypes';
import * as jwt from 'jsonwebtoken';
import setUserToken from './setUserToken';


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
  if(localStorage.token){
    setUserToken(localStorage.token);
  }
  axios
    .post('/users/loginUser/', userData)
    .then((res)=>{
      const decoded = jwt.decode(res.data);
      dispatch({
        type: LOG_IN_USER,
        payload: res.data,
      });
      return axios
        .get(`/dashboards/${decoded.id}`);
    })
    .then(res => dispatch({
      type: FETCH_DASHES,
      payload: res.data,
    }))
    .catch(err => console.log(err));
};

export const loggedInUser = () => (dispatch) => {
  const decoded = jwt.decode(localStorage.getItem('token'));
  if(decoded) {
    const userData = {
      id: decoded.id,
      name: decoded.name,
    };
    localStorage.setItem('userId',userData.id);
    localStorage.setItem('userName',userData.name);
  dispatch({
    type: LOGGED_IN_USER,
  });
  }
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT_USER,
  });
};
