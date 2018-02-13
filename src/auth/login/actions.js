import { createActions } from 'redux-actions';
import { push } from 'react-router-redux';
import firebase, { translateError } from 'utils/firebase';

import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './actionTypes';

import { pushMessage } from '../../app/actions';
import { Messages } from '../../shared/strings';
import Routes from '../../app/routes';

export const {
  logInStart,
  logInSuccess,
  loginError,
  logOut,
} = createActions({
  [LOGIN_START] : () => {},

  [LOGIN_SUCCESS] : () => {},

  [LOGIN_ERROR] : (errors) => ({ errors }),

  [LOGOUT] : () => {},
});

export const loginRequest = (userData) => (dispatch) => {
  dispatch(logInStart());
  return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
    .then(() => {
      dispatch(pushMessage(Messages.LOGIN_SUCCESS));
      dispatch(logInSuccess());
    })
    .catch((error) => {
      dispatch(loginError());
      dispatch(pushMessage(translateError(error)));
    });
};

export const logoutRequest = () => (dispatch) => {
  return firebase.auth().signOut().then(() => {
    dispatch(logOut());
    dispatch(push(Routes.Main.path));
    dispatch(pushMessage(Messages.LOGOUT_SUCCESS));
  });
};
