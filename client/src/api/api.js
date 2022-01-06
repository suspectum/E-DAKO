import axios from 'axios';

// project imports
import { logOut } from 'actions';
import { store } from 'reducers/store';
import { SET_ALERT } from 'constants/actionTypes';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://edako-budget-tracker.herokuapp.com/' : 'http://localhost:4000',
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const user = store.getState().userReducer.userInfo;
  // return auth header with jwt if user is logged
  const isLoggedIn = user && user.jwtToken;
  if (isLoggedIn) {
    config.headers.Authorization = `Bearer ${user.jwtToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ([401, 403].includes(error.response?.status) && store.getState().userReducer.userInfo) {
      store.dispatch(logOut());
      store.dispatch({ type: SET_ALERT, payload: { severity: 'error', message: 'Unauthorized' } });
      window.location.href = '/auth';
    }
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

//================================|| ACCOUNT ROUTES ||================================//

export const signUp = (formData) => API.post('accounts/register', formData);
export const verifyEmail = (formData) => API.post('accounts/verify-email', formData);
export const signIn = (formData) => API.post('accounts/authenticate', formData);
export const refreshToken = () => API.post('accounts/refresh-token');
export const forgotPassword = (formData) => API.post('accounts/forgot-password', formData);
export const validateResetToken = (formData) => API.post('accounts/validate-reset-token', formData);
export const resetPassword = (formData) => API.post('accounts/reset-password', formData);
export const update = (id, formData) => API.put(`accounts/user/${id}`, formData);
export const getAllUser = () => API.get('accounts/users');
export const getById = (id) => API.get(`accounts/user/${id}`);
export const createUser = (formData) => API.post('accounts/', formData);
export const deleteUser = (id) => API.delete(`accounts/user/${id}`);
export const getActiveTokensById = (id) => API.get(`accounts/refresh-tokens/${id}`);
export const logout = () => API.post('accounts/revoke-token');
// TODO add revoke token for user

export const firebaseAuth = (formData) =>
  API.get('accounts/authenticate-firebase', {
    headers: {
      Authorization: `Bearer ${formData}`,
    },
  });
//================================|| TRANSACTION ROUTES ||================================//

export const createTransaction = (formData) => API.post('transactions', formData);
export const getTransactions = ({ limit, start, end }) => API.get(`transactions/filter/?limit=${limit}&start=${start}&end=${end}`);
export const editTransaction = (id, formData) => API.put(`transactions/${id}`, formData);
export const deleteTransaction = (id) => API.delete(`transactions/${id}`);
export const getTransactionsSum = (type) => API.get(`transactions/?type=${type}`);
