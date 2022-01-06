import * as api from 'api/api';
import { store } from 'reducers/store';
import { errorHandler } from './_helpers';
import { SIGNIN_SUCCESS, REFRESH_TOKEN_SUCCES, SET_ALERT, UPDATE_SUCCESS, DELETE_SUCCESS, RESET_STATE } from 'constants/actionTypes';

const { dispatch } = store;

//================================|| USER ACTIONS ||================================//

export const signUp = (formData) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message, duration: 8000 } });
  } catch (error) {
    errorHandler(error);
  }
};

export const verifyEmail = (formData) => async (dispatch) => {
  try {
    const response = await api.verifyEmail(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    errorHandler(error);
    return { status: 'error' };
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    startRefreshTokenTimer();
  } catch (error) {
    errorHandler(error);
  }
};

export const firebaseAuth = (formData) => async (dispatch) => {
  try {
    const { data } = await api.firebaseAuth(formData);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    errorHandler(error);
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const { data } = await api.refreshToken();
    dispatch({ type: REFRESH_TOKEN_SUCCES, payload: data });
    startRefreshTokenTimer();
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const response = await api.forgotPassword(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    errorHandler(error);
  }
};

export const validateResetToken = (formData) => async (dispatch) => {
  try {
    await api.validateResetToken(formData);
    return { status: 'success' };
  } catch (error) {
    errorHandler(error);
    return { status: 'error' };
  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    const response = await api.resetPassword(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    errorHandler(error);
    return { status: 'error' };
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUser();
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const getById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getById(id);
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const update = (id, formData) => async (dispatch) => {
  const user = store.getState().userReducer.userInfo;
  try {
    const { data } = await api.update(id, formData);
    // * admin can update any user's info
    // * in that case don't update logedin user state
    if (data.id === user.id) {
      dispatch({ type: UPDATE_SUCCESS, payload: data });
    }
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: 'Account updated successfully' } });
  } catch (error) {
    errorHandler(error);
  }
};

export const createUser = (formData) => async (dispatch) => {
  try {
    await api.createUser(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: 'Account added successfully' } });
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  const user = store.getState().userReducer.userInfo;
  try {
    const { data } = await api.deleteUser(id);
    // * admin can update user info
    // * in that case don't update logedin user state
    if (id === user.id) {
      dispatch({ type: UPDATE_SUCCESS, payload: data });
    }
    dispatch({ type: DELETE_SUCCESS, payload: { accountDeleted: true } });
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: 'Account deleted successfully' } });
  } catch (error) {
    errorHandler(error);
  }
};

export const getActiveTokensById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getActiveTokensById(id);
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: RESET_STATE });
    stopRefreshTokenTimer();
  } catch (error) {
    errorHandler(error);
  }
};

//================================|| HELPER FUNCTIONS ||================================//

let refreshTokenTimeout;
function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const user = store.getState().userReducer.userInfo;

  const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(() => dispatch(refreshToken()), timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
