import { fetchSensorSchemas, storeSensorSchema } from './api';
import { createActions } from 'redux-actions';

import { pushMessage } from '../app/actions';
import { Messages } from '../shared/strings';

import {
  FETCH_SENSOR_SCHEMA_START,
  FETCH_SENSOR_SCHEMA_SUCCESS,
  FETCH_SENSOR_SCHEMA_ERROR,
  STORE_SENSOR_SCHEMA_START,
  STORE_SENSOR_SCHEMA_SUCCESS,
  STORE_SENSOR_SCHEMA_ERROR,
} from './actionTypes';

const   {
  fetchSensorSchemaStart,
  fetchSensorSchemaSuccess,
  fetchSensorSchemaError,
  storeSensorSchemaStart,
  storeSensorSchemaSuccess,
  storeSensorSchemaError,
} = createActions({
  [FETCH_SENSOR_SCHEMA_START] : () => {},
  [FETCH_SENSOR_SCHEMA_SUCCESS] : (schemas) => ({schemas}),
  [FETCH_SENSOR_SCHEMA_ERROR] : () => {},
  [STORE_SENSOR_SCHEMA_START] : () => {},
  [STORE_SENSOR_SCHEMA_SUCCESS] : (schema) => ({schema}),
  [STORE_SENSOR_SCHEMA_ERROR] : () => {},
});

export const fetchSensorSchemasRequest = () => (dispatch) => {
  dispatch(fetchSensorSchemaStart());
  return fetchSensorSchemas()
    .then(schemas => dispatch(fetchSensorSchemaSuccess(schemas)))
    .catch(error => {
      dispatch(pushMessage(error.data));
      dispatch(fetchSensorSchemaError());
    });
};

export const storeSensorSchemaRequest = (schema) => (dispatch) => {
  dispatch(storeSensorSchemaStart());
  return storeSensorSchema(schema)
    .then(dispatch(storeSensorSchemaSuccess(schema)))
    .then(dispatch(pushMessage(Messages.SAVED)))
    .catch(error => {
      dispatch(pushMessage(error.data));
      dispatch(storeSensorSchemaError());
    });
};
