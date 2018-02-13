import { createActions } from 'redux-actions';

import { translateError } from 'utils/firebase';
import { pushMessage } from '../../app/actions';

import { resetPassword } from './api';
import {
  RESET_PASSWORD_REQUEST_START,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_ERROR,
} from './actionTypes';
import { Messages } from '../../shared/strings';

export const {
  resetPasswordRequestStart,
  resetPasswordRequestSuccess,
  resetPasswordRequestError,
} = createActions({
  [RESET_PASSWORD_REQUEST_START] : () => {},
  [RESET_PASSWORD_REQUEST_SUCCESS] : (email) => ({ email }),
  [RESET_PASSWORD_REQUEST_ERROR] : (errors) => ({ errors }),
});

export const resetPasswordRequest = (email) => (dispatch) => {
  dispatch(resetPasswordRequestStart());
  return resetPassword(email)
    .then(() => {
      dispatch(pushMessage(Messages.RESET_EMAIL_SENT));
      dispatch(resetPasswordRequestSuccess(email));
    })
    .catch((error) => {
      dispatch(pushMessage(translateError(error)));
      dispatch(resetPasswordRequestError(error));
    });
};
