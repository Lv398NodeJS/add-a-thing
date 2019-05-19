import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import subTaskListReducer from './subTaskListReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  subTaskListReducer,
});

export default rootReducer;
