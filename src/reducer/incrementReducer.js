import { REHYDRATE } from 'redux-persist/lib/constants';
// import _ from 'lodash';

const INIT_STATE = {
  count: 0
};

const incrementReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      return { ...state, ...action.payload.incReducer } || { count: -1 };
    case 'COUNT_INC': // Optimistically updates the state
      return { ...state, count: action.payload.count } || { count: -1 };
    case 'COUNT_INC_COMMIT':
      return state;
    case 'COUNT_INC_ROLLBACK': // FIXME: redux-logger not showing this action
      console.log('Rollback');
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export default incrementReducer;
