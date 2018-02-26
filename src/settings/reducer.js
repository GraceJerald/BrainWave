import { handleActions } from 'redux-actions';

import {
  FETCH_SENSOR_SCHEMA_START,
  FETCH_SENSOR_SCHEMA_SUCCESS,
  FETCH_SENSOR_SCHEMA_ERROR,
  STORE_SENSOR_SCHEMA_SUCCESS,
} from './actionTypes';

import { OperationState } from '../shared/constants';

const initialState = {
  operationState : OperationState.IDLE,
  schemas: {},
};

const settingsReducer = handleActions({
  [FETCH_SENSOR_SCHEMA_START] : (state) => ({
    ...state,
    operationState : OperationState.FETCHING,
  }),

  [FETCH_SENSOR_SCHEMA_SUCCESS] : (state, action) => ({
    ...state,
    operationState : OperationState.FETCHED,
    schemas : {
      ...action.payload.schemas,
    },
  }),

  [FETCH_SENSOR_SCHEMA_ERROR] : (state) => ({
    ...state,
    operationState : OperationState.ERROR,
  }),

  [STORE_SENSOR_SCHEMA_SUCCESS] : (state, action) => {
    const { schema } = action.payload;
    return {
      ...state,
      schemas : {
        ...state.schemas,
        [`${schema.disability}-${schema.stimuli}-${schema.comfort}`]: schema,
      },
      operationState : OperationState.SAVED,
    };
  },
}, initialState);

export default settingsReducer;
