import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';
import taskDetailsReducer from './taskDetailsReducer';
import authReducer from './authReducer';

import sortListReducer from './sortListReducer';

const rootReducer = combineReducers({
  authReducer,
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
  taskDetailsReducer,
  sortListReducer,
});

export default rootReducer;
