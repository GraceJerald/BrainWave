import { handleActions } from 'redux-actions';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  location: {
    hash : '',
    key : '',
    pathname : '',
    search : '',
    state : undefined,
  },
};

export const routerReducer = handleActions({
  [LOCATION_CHANGE] : (state, action) => ({
    ...state,
    hash: action.payload.hash,
    key: action.payload.key,
    pathname: action.payload.pathname,
    search: action.payload.search,
    state: action.payload.state,
  }),
}, initialState);
