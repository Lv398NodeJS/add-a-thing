import { ADD_DASHBOARD, DELETE_DASHBOARD, FETCH_DASHES } from './actionTypes';
import { dashesRef } from '../fire';

const addDashboard = ({ dashName, dashDescription }) => ({
  type: ADD_DASHBOARD,
  payload: { dashName, dashDescription },
});

const deleteDashboard = ({ id }) => ({
  type: DELETE_DASHBOARD,
  payload: { id },
});

const fetchDashes = () => async (dispatch) => {
  dashesRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_DASHES,
      payload: snapshot.val(),
    });
  });
};

export { addDashboard, deleteDashboard, fetchDashes };
