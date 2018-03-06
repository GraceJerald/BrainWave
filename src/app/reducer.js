import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { isString } from 'utils/misc';

import {
  PUSH_MESSAGE,
  POP_MESSAGE,
  FETCH_GAME_START,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
} from './actionTypes';

import { routerReducer } from './routerReducer';
import { authReducer } from '../auth/reducer';
import { signUpReducer } from '../auth/signUp/reducer';
import { loginReducer } from '../auth/login/reducer';
import { resetPasswordReducer } from '../auth/resetPassword/reducer';
import profileReducer from '../profile/reducer';
import settingsReducer from '../settings/reducer';
import patientsReducer from '../patients/reducer';
import { OperationState } from '../shared/constants';

const initialState = {
  messages: [],
  fetchStageStatus: OperationState.IDLE,
  stage : {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    startAt: '',
    status: 0,
  },
};

const mainReducer = handleActions({
  [PUSH_MESSAGE] : (state, action) => {
    if (!action.payload.messages) {
      return state;
    }

    let newErrorArray = isString(action.payload.messages) ? [action.payload.messages] : action.payload.messages;
    return {
      ...state,
      messages: [...state.messages, ...newErrorArray],
    };
  },

  [POP_MESSAGE] : (state) => ({
    ...state,
    messages: [...state.messages.slice(1)],
  }),

  [FETCH_GAME_START] : (state) => ({
    ...state,
    fetchStageStatus: OperationState.FETCHING,
  }),

  [FETCH_GAME_SUCCESS] : (state, action) => ({
    ...state,
    fetchStageStatus: OperationState.FETCHED,
    stage: {
      ...action.payload,
    },
  }),

  [FETCH_GAME_ERROR] : (state) => ({
    ...state,
    fetchStageStatus: OperationState.ERROR,
  }),
}, initialState);

export const combinedReducer = combineReducers({
  routing : routerReducer,
  auth : authReducer,
  signUp : signUpReducer,
  login : loginReducer,
  resetPassword : resetPasswordReducer,
  profile : profileReducer,
  main: mainReducer,
  settings : settingsReducer,
  patients : patientsReducer,
});

export default combinedReducer;
