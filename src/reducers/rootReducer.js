import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subTaskListReducer from './subTaskListReducer';
import sortListReducer from './sortListReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subTaskListReducer,
  sortListReducer,
});

export default rootReducer;
