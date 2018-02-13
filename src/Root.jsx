import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { ConnectedRouter, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './app/configureStore';
import App from './app/App';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const history = createHistory();

const routerMiddleware = createRouterMiddleware(history);

const store = configureStore({
  middleware : applyMiddleware(
    thunk,
    logger,
    routerMiddleware,
  ),
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8558da',
      main: '#512ca8',
      dark: '#140078',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5983',
      main: '#f50057',
      dark: '#bb002f',
      contrastText: '#fff',
    },
  },
});

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('container'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    render(require('./app/App').default);
  });
}
