import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
// import 'typeface-roboto';

import firebase from 'utils/firebase';

import AppContent from './components/AppContent';
import Header from './components/header/Header';

import { popMessage } from './actions';
import { pushNotification } from '../auth/actions';
import {
  authStateChanged,
  notificationPermissionChanged,
  changeNotificationPermission,
  fetchNotificationsRequest,
} from '../auth/actions';
import { logoutRequest } from '../auth/login/actions';
import { storeNotificationToken } from './api';

import './App.scss';
import { OperationState } from '../shared/constants';

const mapStateToProps = (state) => ({
  userInfo : state.auth.userInfo,
  messages : state.main.messages,
  notifications : state.auth.notifications,
  fetchStageStatus : state.main.fetchStageStatus,
  notificationPermissionGranted : state.auth.notificationPermissionGranted,
});

const mapDispatchToProps = {
  popMessage,
  pushNotification,
  authStateChanged,
  logoutRequest,
  changeNotificationPermission,
  notificationPermissionChanged,
  fetchNotificationsRequest,
};

const styles = theme => ({
  appContent: {
    flex: '1 0 auto',
    display: 'flex',
    transition: `margin ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`,
    paddingTop: '56px',
    boxSizing: 'border-box',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      paddingTop: '48px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: '64px',
    },
  },
  snackbarVisible: {
    // [theme.breakpoints.down('sm')]: {
    //   marginBottom: 48,
    // },
  },
  center: {
    alignSelf: 'center',
    margin: 'auto',
  },
  drawerContent: {
    width: 250,
  },
});

class App extends Component {
  state = {
    drawerVisible : false,
    snackbarVisible : false,
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackbarVisible : false});
  };

  handleSnackbarClosed = () => {
    this.props.popMessage();
  }

  // todo: refactor
  componentWillMount () {
    firebase.messaging().onMessage((payload) => {
      this.props.pushNotification({
        type : parseInt(payload.data.type),
        title : payload.notification.title,
        body : payload.notification.body,
      });
    });

    firebase.auth().onAuthStateChanged(user => {
      this.props.authStateChanged(user);
      if (user) {
        this.props.fetchNotificationsRequest();
        firebase.messaging().getToken()
          .then((token) => {
            this.props.notificationPermissionChanged(token ? true : false);
            if (token) {
              storeNotificationToken(token);
            }
          })
          .catch(() => {
            this.props.notificationPermissionChanged(false);
          });
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.snackbarVisible && nextProps.messages.length > 0) {
      this.setState({snackbarVisible : true});
    }
  }

  toggleDrawer = () => {
    this.setState({
      drawerVisible: !this.state.drawerVisible,
    });
  };

  render = () => {
    return (
      <React.Fragment>
        <Header
          userInfo={this.props.userInfo}
          notifications={this.props.notifications}
          notificationPermissionGranted={this.props.notificationPermissionGranted}
          onNotificationPermissionChange={this.props.changeNotificationPermission}
          onLogOutClicked={this.props.logoutRequest}
          onMenuClicked={this.toggleDrawer}
        />
        <Drawer
          open={this.state.drawerVisible}
          onClose={this.toggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <div className={this.props.classes.drawerContent}>
              Hi!
            </div>
          </div>
        </Drawer>
        <AppContent
          className={classNames(this.props.classes.appContent, {[this.props.classes.snackbarVisible] : this.state.snackbarVisible})}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackbarVisible}
          autoHideDuration={3000}
          onClose={this.handleRequestClose}
          onExited={this.handleSnackbarClosed}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            this.props.messages.length > 0 && <span id="message-id">{this.props.messages[0]}</span>
          }
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  ...Header.propTypes,
  ...AppContent.propTypes,
  classes : PropTypes.object.isRequired,
  messages : PropTypes.array.isRequired,
  notifications : PropTypes.array.isRequired,
  popMessage : PropTypes.func.isRequired,
  pushNotification : PropTypes.func.isRequired,
  fetchStageStatus : PropTypes.oneOf(Object.values(OperationState)).isRequired,
  notificationPermissionGranted : PropTypes.bool,
  changeNotificationPermission : PropTypes.func.isRequired,
  notificationPermissionChanged : PropTypes.func.isRequired,
  fetchNotificationsRequest : PropTypes.func.isRequired,
};

App.defaultProps = {
  userInfo : {},
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(withStyles(styles)(App));
