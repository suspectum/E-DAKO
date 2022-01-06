import { combineReducers } from 'redux';
import { RESET_STATE } from 'constants/actionTypes';

// reducer import
import { customizationReducer as customization } from './_customizationReducers';
import { userReducer } from './_userReducer';
import { alertReducer as alert } from './_alertReducer';
import { drawerReducer as drawer } from './_drawerReducer';
import { fetchedUsersReducer as fetchedUsers } from './_fetchedUsersReducer';
import { transactionReducer as transaction } from './_transactionReducer';

//================================|| COMBINED REDUCER ||================================//

const combinedReducer = combineReducers({ customization, userReducer, alert, drawer, fetchedUsers, transaction });

export const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
