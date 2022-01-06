import * as api from 'api/api';
import { store } from 'reducers/store';
import { errorHandler } from './_helpers';
import { UPDATE_TRANSACTIONS } from 'constants/actionTypes';

const { dispatch } = store;

//================================|| TRANSACTION ACTIONS ||================================//

export const createTransaction = (formData) => async (dispatch) => {
  try {
    await api.createTransaction(formData);
    updateTransactions();
  } catch (error) {
    errorHandler(error);
  }
};

export const getTransactions = (query) => async (dispatch) => {
  try {
    const { data } = await api.getTransactions(query);
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const editTransaction = (id, formData) => async (dispatch) => {
  try {
    await api.editTransaction(id, formData);
    updateTransactions();
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await api.deleteTransaction(id);
    updateTransactions();
  } catch (error) {
    errorHandler(error);
  }
};

export const getTransactionsSum = (query) => async (dispatch) => {
  try {
    const { data } = await api.getTransactionsSum(query);
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

//================================|| HELPER FUNCTIONS ||================================//

function updateTransactions() {
  dispatch({
    type: UPDATE_TRANSACTIONS,
    payload: { updateRecentTransactions: true, updateCustomTransactions: true, updateDashboard: true },
  });
}
