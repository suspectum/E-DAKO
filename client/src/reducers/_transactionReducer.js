// actions
import * as actionTypes from 'constants/actionTypes';

import { lastWeek } from 'utils';

const initialState = {
  rTransactionsFirstLoad: true,
  cTransactionsFirstLoad: true,
  dasboardFirstLoad: true,
  rTransactions: [],
  cTransactions: [],
  totalIncomeLine: [],
  totalExpenseLine: [],
  topFiveIncomeExpense: [],
  order: '',
  query: lastWeek,
  updateRecentTransactions: false,
  updateCustomTransactions: false,
  updateDashboard: false,
};

//================================|| TRANSACTION REDUCER ||================================//

export const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TRANSACTIONS:
      return {
        ...state,
        updateRecentTransactions: action.payload.updateRecentTransactions,
        updateCustomTransactions: action.payload.updateCustomTransactions,
        updateDashboard: action.payload.updateDashboard,
      };
    case actionTypes.SET_RECENT_TRANSACTIONS:
      return {
        ...state,
        rTransactions: action.payload.rTransactions,
        rTransactionsFirstLoad: false,
      };
    case actionTypes.SET_CUSTOM_TRANSACTIONS:
      return {
        ...state,
        cTransactions: action.payload.cTransactions,
        cTransactionsFirstLoad: false,
      };
    case actionTypes.SET_TRANSACTIONS_SORT:
      return {
        ...state,
        order: action.payload.order,
      };
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };
    case actionTypes.SET_DASHBOARD:
      return {
        ...state,
        dasboardFirstLoad: false,
        totalIncomeLine: action.payload.totalIncomeLine,
        totalExpenseLine: action.payload.totalExpenseLine,
        topFiveIncomeExpense: action.payload.topFiveIncomeExpense,
      };
    default:
      return state;
  }
};
