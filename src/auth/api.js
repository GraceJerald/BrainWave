import { httpUtility, buildQueryStringByObject } from '../utils/httpUtility';
import { FORM_URL_ENCODED_DATA } from '../utils/MimeType';

import { AUTH_URL } from '../app/config';

import firebase from 'utils/firebase';

export const updateTokens = (refreshToken) => {
  const headers = {
    'Content-Type' : FORM_URL_ENCODED_DATA,
    'Accept' : FORM_URL_ENCODED_DATA,
  };

  const body = {
    'grant_type' : 'refresh_token',
    'refresh_token' : refreshToken,
  };

  return httpUtility.post(`${AUTH_URL}/token`, headers, buildQueryStringByObject(body));
};

export const fetchNotifications = () => {
  const userId = firebase.auth().currentUser.uid;

  return firebase.firestore().collection('users').doc(userId).collection('notifications').get();
};
