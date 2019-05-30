import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subTaskListReducer from './subTaskListReducer';
import taskDetailsReducer from './taskDetailsReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subTaskListReducer,
  taskDetailsReducer,
});

export default rootReducer;
