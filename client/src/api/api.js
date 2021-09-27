import axios from 'axios';
import store from 'reducers/store';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const user = store.getState().userSignIn.userInfo;
  // return auth header with jwt if user is logged
  const isLoggedIn = user && user.jwtToken;
  if (isLoggedIn) {
    config.headers.Authorization = `Bearer ${user.jwtToken}`;
  }
  return config;
});

export const signUp = (formData) => API.post('accounts/register', formData);
export const verifyEmail = (formData) => API.post('accounts/verify-email', formData);
export const signIn = (formData) => API.post('accounts/authenticate', formData);
export const refreshToken = () => API.post('accounts/refresh-token');
export const forgotPassword = (formData) => API.post('accounts/forgot-password', formData);
export const validateResetToken = (formData) => API.post('accounts/validate-reset-token', formData);
export const resetPassword = (formData) => API.post('accounts/reset-password', formData);
export const update = (id, formData) => API.put(`accounts/${id}`, formData);

export const logout = () => API.post('accounts/revoke-token');
