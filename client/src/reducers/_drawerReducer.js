// actions
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  isDrawerOpen: true,
};

//================================|| DRAWER REDUCER ||================================//

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DRAWER_OPEN:
      return {
        isDrawerOpen: action.payload,
      };
    default:
      return state;
  }
};
