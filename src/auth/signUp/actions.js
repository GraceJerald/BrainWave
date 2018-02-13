import { push } from 'react-router-redux';
import { createActions } from 'redux-actions';

import { pushMessage } from '../../app/actions';
import Routes from '../../app/routes';

import firebase, { translateError } from 'utils/firebase';

import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './actionTypes';

export const {
  signUpStart,
  signUpSuccess,
  signUpError,
} = createActions({
  [SIGN_UP_START] : () => {},
  [SIGN_UP_SUCCESS] : () => {},
  [SIGN_UP_ERROR] : () => {},
});

export const signUpRequest = (userData) => (dispatch) => {
  dispatch(signUpStart());
  return firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    .then((user) => {
      dispatch(signUpSuccess());
      dispatch(push(Routes.Login.path));
      firebase.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        name: userData.name,
        surname: userData.surname,
      });
    })
    .catch((error) => {
      dispatch(pushMessage(translateError(error)));
      dispatch(signUpError(error.data));
    });
};
