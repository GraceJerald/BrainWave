import { createActions } from 'redux-actions';

import { pushMessage } from '../app/actions';

import {
  fetchUser,
  fetchTeam,
  saveTeam,
  saveUser,
  verifyPhone,
  verifyPhoneConfirmRequest,
  joinGameToggled,
  fetchTeamGameData,
} from './api';

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
  VERIFY_PHONE_START,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_CONFIRM_SUCCESS,
  VERIFY_PHONE_ERROR,
  CREATE_TEAM,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  SAVE_USER_START,
  SAVE_USER_SUCCESS,
  SAVE_USER_ERROR,
  EDIT_USER_PROFILE,
  FETCH_TEAM_GAME_DATA_START,
  FETCH_TEAM_GAME_DATA_SUCCESS,
  FETCH_TEAM_GAME_DATA_ERROR,
  TEAM_JOIN_GAME_TOGGLED,
} from './actionTypes';
import { Messages } from '../shared/strings';

const {
  fetchTeamStart,
  fetchTeamSuccess,
  fetchTeamError,
  saveTeamStart,
  saveTeamSuccess,
  saveTeamError,
  updateCaptainData,
  addRosterMember,
  removeRosterMember,
  editTeamProfile,
  changeTeamTitle,
  verifyPhoneStart,
  verifyPhoneSuccess,
  verifyPhoneConfirmSuccess,
  verifyPhoneError,
  createTeam,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  saveUserStart,
  saveUserSuccess,
  saveUserError,
  editUserProfile,
  fetchTeamGameDataStart,
  fetchTeamGameDataSuccess,
  fetchTeamGameDataError,
  teamJoinGameToggled,
} = createActions({
  [FETCH_TEAM_START] : () => {},

  [FETCH_TEAM_SUCCESS] : (teamProfileData) => ({teamProfileData}),

  [FETCH_TEAM_ERROR] : () => {},

  [SAVE_TEAM_START] : () => {},

  [SAVE_TEAM_SUCCESS] : () => {},

  [SAVE_TEAM_ERROR] : () => {},

  [UPDATE_CAPTAIN_DATA] : (captainData) => ({captainData}),

  [ADD_ROSTER_MEMBER] : (memberData) => ({memberData}),

  [REMOVE_ROSTER_MEMBER] : (memberIndex) => ({memberIndex}),

  [EDIT_TEAM_PROFILE] : () => {},

  [CHANGE_TEAM_TITLE] : (newTitle) => ({newTitle}),

  [VERIFY_PHONE_START] : () => {},

  [VERIFY_PHONE_SUCCESS] : (confirmationResult) => ({confirmationResult}),

  [VERIFY_PHONE_CONFIRM_SUCCESS] : () => {},

  [VERIFY_PHONE_ERROR] : () => {},

  [CREATE_TEAM] : (newTeam) => ({newTeam}),

  [FETCH_USER_START] : () => {},

  [FETCH_USER_SUCCESS] : (userProfileData) => ({userProfileData}),

  [FETCH_USER_ERROR] : () => {},

  [SAVE_USER_START] : () => {},

  [SAVE_USER_SUCCESS] : (userProfileData) => ({userProfileData}),

  [SAVE_USER_ERROR] : () => {},

  [EDIT_USER_PROFILE] : () => {},

  [FETCH_TEAM_GAME_DATA_START] : () => {},

  [FETCH_TEAM_GAME_DATA_SUCCESS] : (teamGameData) => ({teamGameData}),

  [FETCH_TEAM_GAME_DATA_ERROR] : () => {},

  [TEAM_JOIN_GAME_TOGGLED] : (gameId, teamGameStatus) => ({gameId, teamGameStatus}),
});

export {
  updateCaptainData,
  addRosterMember,
  removeRosterMember,
  editTeamProfile,
  changeTeamTitle,
  createTeam,
  editUserProfile,
  verifyPhoneError,
};

export const fetchUserRequest = (userId) => (dispatch) => {
  dispatch(fetchUserStart());
  return fetchUser(userId)
    .then(document => {
      if (!document.exists) {
        throw new Error();
      }
      dispatch(fetchUserSuccess({
        id: document.id,
        ...document.data(),
      }));
    })
    .catch(() => {
      dispatch(fetchUserError());
    });
};

export const fetchTeamRequest = (userId) => (dispatch) => {
  dispatch(fetchTeamStart());
  return fetchTeam(userId)
    .then(document => {
      if (!document.exists) {
        throw new Error();
      }
      dispatch(fetchTeamSuccess({
        id: document.id,
        ...document.data(),
      }));
    })
    .catch(() => {
      dispatch(fetchTeamError());
    });
};

export const saveTeamRequest = (teamProfileData) => (dispatch) => {
  dispatch(saveTeamStart());
  return saveTeam(teamProfileData)
    .then(() => {
      dispatch(pushMessage('Сохранено'));
      dispatch(saveTeamSuccess());
    })
    .catch((error) => {
      dispatch(pushMessage(error.data));
      dispatch(saveTeamError());
    });
};

export const saveUserRequest = (userProfileData) => (dispatch) => {
  dispatch(saveUserStart());
  return saveUser(userProfileData)
    .then(() => {
      dispatch(pushMessage('Сохранено'));
      dispatch(saveUserSuccess(userProfileData));
    })
    .catch((error) => {
      dispatch(pushMessage(error.data));
      dispatch(saveUserError());
    });
};

export const verifyPhoneRequest = (phoneNumber) => (dispatch) => {
  dispatch(verifyPhoneStart());
  return verifyPhone(phoneNumber)
    .then((confirmationResult) => {
      dispatch(pushMessage(Messages.PHONE_VERIFICATION_SENT));
      dispatch(verifyPhoneSuccess(confirmationResult));
    })
    .catch((error) => {
      dispatch(pushMessage(error.message));
      dispatch(verifyPhoneError());
    });
};

export const verifyPhoneConfirm = (confirmationResult, code) => (dispatch) => {
  return verifyPhoneConfirmRequest(confirmationResult, code)
    .then(() => {
      dispatch(pushMessage(Messages.PHONE_VERIFICATION_COMPLETE));
      dispatch(verifyPhoneConfirmSuccess());
    })
    .catch((error) => {
      dispatch(pushMessage(error.message));
      dispatch(verifyPhoneError());
    });
};

export const fetchTeamGameDataRequest = (teamId) => (dispatch) => {
  dispatch(fetchTeamGameDataStart());
  return fetchTeamGameData(teamId)
    .then((teamGameData) => dispatch(fetchTeamGameDataSuccess(teamGameData)))
    .catch((error) => {
      dispatch(pushMessage(error.message));
      dispatch(fetchTeamGameDataError());
    });
};

export const joinGameRequest = (gameId, teamId, joined) => (dispatch) => {
  return joinGameToggled(gameId, teamId, joined)
    .then(() => {
      dispatch(pushMessage(joined ? Messages.JOINED_GAME : Messages.LEFT_GAME));
      dispatch(teamJoinGameToggled(gameId, joined));
    })
    .catch((error) => {
      dispatch(pushMessage(error.message));
    });
};
