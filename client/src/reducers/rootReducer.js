import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subtaskReducer from './subtaskReducer';
import taskDetailsReducer from './taskDetailsReducer';


const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subtaskReducer,
  taskDetailsReducer,
});

export default rootReducer;
