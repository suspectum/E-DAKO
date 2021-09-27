import { SIGNIN_SUCCESS, LOGOUT, REFRESH_TOKEN_SUCCES, SET_ALERT, UPDATE_SUCCESS } from 'constants/actionTypes';
import * as api from 'api/api';
import store from 'reducers/store';

const { dispatch } = store;

export const signUp = (formData) => async (dispatch) => {
  try {
    const response = await api.signUp(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message, duration: 8000 } });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
  }
};

export const verifyEmail = (formData) => async (dispatch) => {
  try {
    const response = await api.verifyEmail(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
    return { status: 'error' };
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    startRefreshTokenTimer();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const { data } = await api.refreshToken();
    dispatch({ type: REFRESH_TOKEN_SUCCES, payload: data });
    startRefreshTokenTimer();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.log(message);
  }
};

export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const response = await api.forgotPassword(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
  }
};

export const validateResetToken = (formData) => async (dispatch) => {
  try {
    await api.validateResetToken(formData);
    return { status: 'success' };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
    return { status: 'error' };
  }
};

export const resetPassword = (formData) => async (dispatch) => {
  try {
    const response = await api.resetPassword(formData);
    dispatch({ type: SET_ALERT, payload: { severity: 'success', message: response.data.message } });
    return { status: 'success' };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
    return { status: 'error' };
  }
};

export const update = (id, formData) => async (dispatch) => {
  try {
    const { data } = await api.update(id, formData);
    dispatch({ type: UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
    stopRefreshTokenTimer();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: SET_ALERT, payload: { severity: 'error', message: message } });
  }
};

// helper functions

let refreshTokenTimeout;
function startRefreshTokenTimer() {
  // parse json object from base64 encoded jwt token
  const user = store.getState().userSignIn.userInfo;

  const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(() => dispatch(refreshToken()), timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
