import { combineReducers } from 'redux';
import mainViewReducer from './mainViewReducer';

const rootReducer = combineReducers({
  mainViewReducer,
});

export default rootReducer;
