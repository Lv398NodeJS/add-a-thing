import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';
import taskDetailsReducer from './taskDetailsReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  authReducer,
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
  taskDetailsReducer,
});

export default rootReducer;
