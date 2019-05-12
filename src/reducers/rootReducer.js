import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';
import mainInputReducer from './mainInputReducer';

const rootReducer = combineReducers({
  mainViewReducer,
  mainInputReducer,
});

export default rootReducer;
