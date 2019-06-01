import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';
import taskDetailsReducer from './taskDetailsReducer';
import sortListReducer from './sortListReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
  taskDetailsReducer,
  sortListReducer,
});

export default rootReducer;
