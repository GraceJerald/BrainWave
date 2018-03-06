import { fetchPatients, savePatient, deletePatient } from './api';
import { createActions } from 'redux-actions';

import { pushMessage } from '../app/actions';
import { Messages } from '../shared/strings';

import {
  FETCH_PATIENTS_START,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_ERROR,
  SAVE_PATIENT_START,
  SAVE_PATIENT_SUCCESS,
  SAVE_PATIENT_ERROR,
  PATIENT_DELETED,
} from './actionTypes';

const   {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsError,
  savePatientStart,
  savePatientSuccess,
  savePatientError,
  patientDeleted,
} = createActions({
  [FETCH_PATIENTS_START] : () => {},
  [FETCH_PATIENTS_SUCCESS] : (patients) => ({patients}),
  [FETCH_PATIENTS_ERROR] : () => {},
  [SAVE_PATIENT_START] : () => {},
  [SAVE_PATIENT_SUCCESS] : (patient) => ({patient}),
  [SAVE_PATIENT_ERROR] : () => {},
  [PATIENT_DELETED] : (patientId) => ({patientId}),
});

export const fetchPatientsRequest = () => (dispatch) => {
  dispatch(fetchPatientsStart());
  return fetchPatients()
    .then(patients => dispatch(fetchPatientsSuccess(patients)))
    .catch(error => {
      dispatch(pushMessage(error.data));
      dispatch(fetchPatientsError());
    });
};

export const savePatientRequest = (patient) => (dispatch) => {
  dispatch(savePatientStart());
  return savePatient(patient)
    .then((savedPatient) => {
      dispatch(savePatientSuccess(savedPatient));
      dispatch(pushMessage(Messages.SAVED));
    })
    .catch(error => {
      dispatch(pushMessage(error.data));
      dispatch(savePatientError());
    });
};

export const deletePatientRequest = (patientId) => (dispatch) => {
  return deletePatient(patientId)
    .then((deletedPatientId) => {
      dispatch(patientDeleted(deletedPatientId));
      dispatch(pushMessage(Messages.SAVED));
    })
    .catch(error => {
      dispatch(pushMessage(error.data));
    });
};
