import { createStore, compose } from 'redux';

import combinedReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore({ initialState, middleware }) {
  const store = createStore(
    combinedReducer,
    initialState,
    composeEnhancers(middleware),
  );

  if (module.hot) {
    module.hot.accept(combinedReducer, () => store.replaceReducer(combinedReducer));
  }

  return store;
}
