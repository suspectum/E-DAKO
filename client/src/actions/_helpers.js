import { store } from 'reducers/store';
import { SET_ALERT } from 'constants/actionTypes';

const { dispatch } = store;

export function errorHandler(error) {
  dispatch({ type: SET_ALERT, payload: { severity: 'error', message: error } });
}
