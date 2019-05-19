import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subTaskListReducer from './subTaskListReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subTaskListReducer,
});

export default rootReducer;
