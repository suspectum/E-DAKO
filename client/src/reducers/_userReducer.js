// actions
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  userInfo: null,
};

//================================|| USER REDUCER ||================================//

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.REFRESH_TOKEN_SUCCES:
      return { userInfo: action.payload };
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    default:
      return state;
  }
};
