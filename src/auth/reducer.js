import { handleActions } from 'redux-actions';

import {
  SET_USER_INFO,
  RESET_USER_INFO,
  SYNC_USER_INFO,
  AUTH_STATE_CHANGED,
  NOTIFICATION_PERMISSION_CHANGED,
  NOTIFICATIONS_FETCHED,
  PUSH_NOTIFICATION,
} from './actionTypes';

const initialState = {
  isAuthenticated : false,
  userInfo: {},
  notificationPermissionGranted : false,
  notifications : [],
};

export const authReducer = handleActions({
  [SET_USER_INFO] : (state, action) => ({
    ...state,
    userInfo: {
      ...action.payload.userInfo,
    },
    isAuthenticated: true,
  }),

  [RESET_USER_INFO] : (state) => ({
    ...state,
    userInfo: {},
    isAuthenticated: false,
  }),

  [SYNC_USER_INFO] : (state, action) => ({
    ...state,
    userInfo: {
      ...action.payload.userInfo,
    },
    isAuthenticated: action.payload.isAuthenticated,
  }),

  [AUTH_STATE_CHANGED] : (state, action) => ({
    ...state,
    isAuthenticated : action.payload.user != null,
    userInfo: action.payload.user,
  }),

  [NOTIFICATION_PERMISSION_CHANGED] : (state, action) => ({
    ...state,
    notificationPermissionGranted : action.payload.granted,
  }),

  [NOTIFICATIONS_FETCHED] : (state, action) => ({
    ...state,
    notifications: action.payload.notifications,
  }),

  [PUSH_NOTIFICATION] : (state, action) => ({
    ...state,
    notifications: [...state.notifications, ...action.payload.notifications],
  }),
}, initialState);
