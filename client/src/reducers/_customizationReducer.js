// project imports
import config from 'config';

// action - state management
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  fontFamily: config.fontFamilies[0],
  borderRadius: config.borderRadius,
  drawerOpen: true,
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

export const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DRAWER_OPEN:
      return {
        ...state,
        drawerOpen: action.payload,
      };
    case actionTypes.FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.payload,
      };
    case actionTypes.BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.payload,
      };
    default:
      return state;
  }
};
