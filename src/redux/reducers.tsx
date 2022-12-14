import { combineReducers } from 'redux';
import auth from './auth/reducer';
import idea from './idea/reducer'
// import dashboard from './dashboard/reducer';

const reducers = combineReducers({
  auth,
  idea
  // dashboard,
});

export default reducers;