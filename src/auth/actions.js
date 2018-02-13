import { createActions } from 'redux-actions';

import firebase from 'utils/firebase';
import { pushMessage } from '../app/actions';
import { fetchNotifications } from './api';

import {
  AUTH_STATE_CHANGED,
  NOTIFICATION_PERMISSION_CHANGED,
  NOTIFICATIONS_FETCHED,
  PUSH_NOTIFICATION,
} from './actionTypes';
import { Messages } from '../shared/strings';

// todo: consider moving notificaions to different reducer

export const {
  authStateChanged,
  notificationPermissionChanged,
  notificationsFetched,
  pushNotification,
} = createActions({
  [AUTH_STATE_CHANGED] : (user) => {
    if (!user) {
      return {user};
    }
    const { uid, email, emailVerified, phoneNumber } = user;
    return {
      user : {
        uid,
        email,
        emailVerified,
        phoneNumber,
      },
    };
  },

  [NOTIFICATION_PERMISSION_CHANGED] : (granted) => ({granted}),

  [NOTIFICATIONS_FETCHED] : (notifications) => ({notifications}),

  [PUSH_NOTIFICATION] : (notifications) => ({
    notifications: Array.isArray(notifications) ? notifications : [notifications],
  }),
});

export const changeNotificationPermission = (grant) => (dispatch) => {
  if (grant === false) {
    if (typeof navigator.permissions === 'object' && typeof navigator.permissions.revoke === 'function') {
      return navigator.permissions.revoke({name: 'push', userVisibleOnly: true})
        .then(() => {
          dispatch(notificationPermissionChanged(false));
          dispatch(pushMessage(Messages.NOTIFICATION_PERMISSION_REVOKED));
        });
    }
  } else {
    return firebase.messaging().requestPermission()
      .then(() => {
        dispatch(notificationPermissionChanged(true));
        dispatch(pushMessage(Messages.NOTIFICATION_PERMISSION_GRANTED));
      })
      .catch(() => {
        dispatch(notificationPermissionChanged(false));
      });
  }
};

export const fetchNotificationsRequest = () => (dispatch) => {
  return fetchNotifications()
    .then(notificationsSnapshot => {
      if (!notificationsSnapshot.empty) {
        let notificaions = [];
        notificationsSnapshot.forEach(notificaion => notificaions.push(notificaion.data()));
        dispatch(notificationsFetched(notificaions));
      }
    });
};
