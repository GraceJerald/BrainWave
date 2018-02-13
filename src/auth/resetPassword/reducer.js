import { handleActions } from 'redux-actions';

import {
  RESET_PASSWORD_REQUEST_START,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_ERROR,
} from './actionTypes';
import { OperationState } from '../../shared/constants';

const initialState = {
  resetOperationState: OperationState.IDLE,
};

export const resetPasswordReducer = handleActions({
  [RESET_PASSWORD_REQUEST_START] : (state) => ({
    ...state,
    resetOperationState: OperationState.SAVING,
  }),

  [RESET_PASSWORD_REQUEST_SUCCESS] : (state) => ({
    ...state,
    resetOperationState: OperationState.SAVED,
  }),

  [RESET_PASSWORD_REQUEST_ERROR] : (state) => ({
    ...state,
    resetOperationState: OperationState.ERROR,
  }),
}, initialState);
