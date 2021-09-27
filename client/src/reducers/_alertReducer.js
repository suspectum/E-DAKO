// action - state management
import * as actionTypes from 'constants/actionTypes';

const initialState = {
  action: false,
  open: false,
  message: '',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  severity: '',
  transition: 'Fade',
  duration: 5000,
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return {
        ...state,
        action: true,
        open: true,
        message: action.payload.message ? action.payload.message : initialState.message,
        anchorOrigin: action.payload.anchorOrigin ? action.payload.anchorOrigin : initialState.anchorOrigin,
        severity: action.payload.severity ? action.payload.severity : initialState.severity,
        transition: action.payload.transition ? action.payload.transition : initialState.transition,
        duration: action.payload.duration ? action.payload.duration : initialState.duration,
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        action: false,
        open: false,
        message: '',
        duration: 5000,
        severity: '',
      };
    default:
      return state;
  }
};
