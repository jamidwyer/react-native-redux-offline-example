import { combineReducers } from 'redux';

import incrementReducer from './incrementReducer';

export default combineReducers({
  incReducer: incrementReducer,
});
