import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainContainerReducer from './mainContainerReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainContainerReducer,
});

export default rootReducer;
