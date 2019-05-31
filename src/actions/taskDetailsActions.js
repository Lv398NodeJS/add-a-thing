import {
  FETCH_TASK_DETAILS,
  UPDATE_TASK_DETAILS,
  DELETE_TASK_DETAILS,
} from './actionTypes';


const fetchTaskDetails = taskRef => async (dispatch) => {
  taskRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_TASK_DETAILS,
      payload: snapshot.val(),
    });
  });
};

const deleteTaskDetails = taskRef => (dispatch) => {
  taskRef.remove();
  dispatch({
    type: DELETE_TASK_DETAILS,

  });
};

const updateTaskDetails = updatedTaskDetails => ({
  type: UPDATE_TASK_DETAILS,
  payload: updatedTaskDetails,
});


export {
  fetchTaskDetails, deleteTaskDetails, updateTaskDetails,
};
