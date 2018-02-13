import { handleActions } from 'redux-actions';

import {
  FETCH_TEAM_START,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_ERROR,
  SAVE_TEAM_START,
  SAVE_TEAM_SUCCESS,
  SAVE_TEAM_ERROR,
  UPDATE_CAPTAIN_DATA,
  ADD_ROSTER_MEMBER,
  REMOVE_ROSTER_MEMBER,
  EDIT_TEAM_PROFILE,
  CHANGE_TEAM_TITLE,
  CREATE_TEAM,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
  EDIT_USER_PROFILE,
  VERIFY_PHONE_START,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_CONFIRM_SUCCESS,
  VERIFY_PHONE_ERROR,
  FETCH_TEAM_GAME_DATA_START,
  FETCH_TEAM_GAME_DATA_SUCCESS,
  FETCH_TEAM_GAME_DATA_ERROR,
  TEAM_JOIN_GAME_TOGGLED,
} from './actionTypes';

import { OperationState } from '../shared/constants';

const initialState = {
  operationState : OperationState.IDLE,
  user : undefined,
  phoneVerificationResult : undefined,
  team : undefined,
  teamGameData : [],
};

const teamReducer = handleActions({
  [CREATE_TEAM] : (state, action) => ({
    ...state,
    operationState : OperationState.EDITING,
    team : {
      ...action.payload.newTeam,
    },
  }),

  [FETCH_TEAM_START] : (state) => ({
    ...state,
    operationState : OperationState.FETCHING,
  }),

  [FETCH_TEAM_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.FETCHED,
    team : {
      ...action.payload.teamProfileData,
    },
  }),

  [FETCH_TEAM_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.ERROR,
  }),

  [SAVE_TEAM_START] : (state) => ({
    ...state,
    operationState : OperationState.SAVING,
  }),

  [SAVE_TEAM_SUCCESS] : (state) => ({
    ...state,
    operationState : OperationState.SAVED,
  }),

  [SAVE_TEAM_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.EDITING,
  }),

  [EDIT_TEAM_PROFILE] : (state) => ({
    ...state,
    operationState : OperationState.EDITING,
  }),

  [UPDATE_CAPTAIN_DATA] : (state, action) => ({
    ...state,
    team: {
      ...state.team,
      captain : {
        ...state.team.captain,
        ...action.payload.captainData,
      },
    },
  }),

  [ADD_ROSTER_MEMBER] : (state, action) => ({
    ...state,
    team: {
      ...state.team,
      members : [
        ...state.team.members,
        action.payload.memberData,
      ],
    },
  }),

  [REMOVE_ROSTER_MEMBER] : (state, action) => ({
    ...state,
    team : {
      ...state.team,
      members: state.team.members.slice(0, action.payload.memberIndex).concat(state.team.members.slice(action.payload.memberIndex + 1)),
    },
  }),

  [CHANGE_TEAM_TITLE] : (state, action) => ({
    ...state,
    team : {
      ...state.team,
      title: action.payload.newTitle,
    },
  }),

  [FETCH_USER_START] : (state) => ({
    ...state,
    operationState : OperationState.FETCHING,
  }),

  [FETCH_USER_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.FETCHED,
    user : {
      ...action.payload.userProfileData,
    },
  }),

  [FETCH_USER_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.ERROR,
  }),

  [SAVE_USER_START] : (state) => ({
    ...state,
    operationState : OperationState.SAVING,
  }),

  [SAVE_USER_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.SAVED,
    user : {
      ...action.payload.userProfileData,
    },
  }),

  [SAVE_USER_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.EDITING,
  }),

  [EDIT_USER_PROFILE] : (state) => ({
    ...state,
    operationState : OperationState.EDITING,
  }),

  [VERIFY_PHONE_START] : (state) => ({
    ...state,
    phoneVerificationResult : undefined,
  }),

  [VERIFY_PHONE_SUCCESS] : (state, action) => ({
    ...state,
    phoneVerificationResult : action.payload.confirmationResult,
  }),

  [VERIFY_PHONE_CONFIRM_SUCCESS] : (state) => ({
    ...state,
    phoneVerificationResult : undefined,
  }),

  [VERIFY_PHONE_ERROR] : (state) => ({
    ...state,
    phoneVerificationResult : undefined,
  }),

  [FETCH_TEAM_GAME_DATA_START] : (state) => ({
    ...state,
    operationState : OperationState.FETCHING,
  }),

  [FETCH_TEAM_GAME_DATA_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.FETCHED,
    teamGameData : [
      ...action.payload.teamGameData,
    ],
  }),

  [FETCH_TEAM_GAME_DATA_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.ERROR,
  }),

  [TEAM_JOIN_GAME_TOGGLED] : (state, action) => ({
    ...state,
    teamGameData: action.payload.teamGameStatus
      ? [ ...state.teamGameData, { id: action.payload.gameId }]
      : state.teamGameData.filter(gameData => gameData.id !== action.payload.gameId),
  }),
}, initialState);

export default teamReducer;
