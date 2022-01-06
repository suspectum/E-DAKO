// actions
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  usersInfo: null,
  accountDeleted: false,
};

//================================|| FETCHED USERS REDUCER ||================================//

export const fetchedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHED_USERS_SUCESS:
      return {
        accountDeleted: action.payload.accountDeleted,
        usersInfo: action.payload.usersInfo,
      };
    case actionTypes.DELETE_SUCCESS:
      return {
        ...state,
        accountDeleted: action.payload.accountDeleted,
      };
    default:
      return state;
  }
};
