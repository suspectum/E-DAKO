// action - state management
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  userInfo: null,
};

//-----------------------|| AUHT REDUCER ||-----------------------//

export const userSignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESS:
    case actionTypes.REFRESH_TOKEN_SUCCES:
      return { userInfo: action.payload };
    case actionTypes.UPDATE_SUCCESS:
      return {
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};
