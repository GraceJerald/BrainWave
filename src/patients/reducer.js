import { handleActions } from 'redux-actions';

import {
  FETCH_PATIENTS_START,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  SAVE_PATIENT_SUCCESS,
  PATIENT_DELETED,
} from './actionTypes';

import { OperationState } from '../shared/constants';

const initialState = {
  operationState : OperationState.IDLE,
  patients: [],
};

const patientsReducer = handleActions({
  [FETCH_PATIENTS_START] : (state) => ({
    ...state,
    operationState : OperationState.FETCHING,
  }),

  [FETCH_PATIENTS_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.FETCHED,
    patients : [
      ...action.payload.patients,
    ],
  }),

  [FETCH_PATIENTS_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.ERROR,
  }),

  [SAVE_PATIENT_SUCCESS] : (state, action) => {
    let { patients } = state;
    patients = patients.filter((patient) => patient.id !== action.payload.patient.id);
    patients.push(action.payload.patient);

    return {
      ...state,
      operationState : OperationState.SAVED,
      patients,
    };
  },

  [PATIENT_DELETED] : (state, action) => {
    let { patients } = state;
    patients = patients.filter((patient) => patient.id !== action.payload.patientId);

    return {
      ...state,
      operationState : OperationState.SAVED,
      patients,
    };
  },
}, initialState);

export default patientsReducer;
