import { handleActions } from 'redux-actions';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './actionTypes';

const initialState = {
  isLoginInProcess : false,
};

export const loginReducer = handleActions({
  [LOGIN_START] : (state) => ({
    ...state,
    isLoginInProcess: true,
  }),

  [LOGIN_SUCCESS] : (state) => ({
    ...state,
    isLoginInProcess: false,
  }),

  [LOGIN_ERROR] : (state) => ({
    ...state,
    isLoginInProcess: false,
  }),
}, initialState);
