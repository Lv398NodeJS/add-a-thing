import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';
import subTaskReducer from './subTaskReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
  subTaskReducer,
});

export default rootReducer;
