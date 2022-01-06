// actions
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

//================================|| ALERT REDUCER ||================================//

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      const { message, anchorOrigin, severity, transition, duration } = action.payload;
      return {
        ...state,
        action: true,
        open: true,
        message: message ? message : initialState.message,
        anchorOrigin: anchorOrigin ? anchorOrigin : initialState.anchorOrigin,
        severity: severity ? severity : initialState.severity,
        transition: transition ? transition : initialState.transition,
        duration: duration ? duration : initialState.duration,
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
