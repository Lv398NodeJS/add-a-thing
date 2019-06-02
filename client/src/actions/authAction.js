import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS } from './actionTypes';
import db, { facebookProvider, googleProvider } from '../fire';

export const authWithFacebook = (dispatch) => {
  console.log('auth with FB');
  db.auth().signInWithPopup(facebookProvider)
    .then((result, error) => (dispatch(error ? { type: LOGIN_ERROR } : { type: LOGIN_SUCCESS, user: result.user })));
};

export const authWithGoogle = (dispatch) => {
  console.log('auth with Google');
  db.auth().signInWithPopup(googleProvider)
    .then((result, error) => (dispatch(error ? { type: LOGIN_ERROR } : { type: LOGIN_SUCCESS, user: result.user })));
};

export const authWithEmailPassword = (credentials) => {
  console.log('auth with mail and password');
  return (dispatch) => {
    const { email, password } = credentials;
    db.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        console.log(providers);
        if (providers.length === 0) {
          return db.auth().createUserWithEmailAndPassword(email, password);
        }
        if (providers.indexOf('password') === -1) {
        } else {
          return db.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then((user) => {
        if (user.user && user.user.email) {
          dispatch({ type: LOGIN_SUCCESS, user: user.user });
        } else {
          dispatch({ type: LOGIN_ERROR, error: 'No user with credentials' });
        }
      })
      .catch((error) => {
        dispatch({ type: LOGIN_ERROR, error });
      });
  };
};

export const signOut = (dispatch) => {
  console.log('signout');
  db.auth().signOut().then((user) => {
    dispatch({ type: SIGNOUT_SUCCESS });
  });
}
