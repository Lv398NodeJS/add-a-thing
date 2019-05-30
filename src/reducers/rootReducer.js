import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';
import sortListReducer from './sortListReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
  sortListReducer,
});

export default rootReducer;
