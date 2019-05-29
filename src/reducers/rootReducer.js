import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
});

export default rootReducer;
