import { handleActions } from 'redux-actions';

import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './actionTypes';

const initialState = {
  inProgress : false,
};

export const signUpReducer = handleActions({
  [SIGN_UP_START] : (state) => ({
    ...state,
    inProgress : true,
  }),

  [SIGN_UP_SUCCESS] : (state) => ({
    ...state,
    inProgress : false,
  }),

  [SIGN_UP_ERROR] : (state) => ({
    ...state,
    inProgress : false,
  }),
}, initialState);
