import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Routes from '../../routes';
import { default as UserInfoComponent } from './UserInfo';
import NotificationCenter from './NotifcationCenter';

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../../../auth/authWrappers';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
// import Typography from 'material-ui/Typography';

import MenuIcon from 'material-ui-icons/Menu';

import { withStyles } from 'material-ui/styles';

const WrappedLink = userIsNotAuthenticated(({to}) => (
  <Button component={props => <Link to={to.path} {...props} />} color="inherit">
    {to.text}
  </Button>
));

WrappedLink.propTypes = {
  to: PropTypes.object.isRequired,
};

const UserInfo = userIsAuthenticated(UserInfoComponent);
const WrappedNotificationCenter = userIsAuthenticated(NotificationCenter);

const styles = {
  flex: {
    marginRight: 'auto',
  },
  inactive: {
    pointerEvents: 'none',
  },
  menuButton: {
    marginLeft: -12,
  },
};

const Header = ({ notifications, userInfo, classes, onLogOutClicked, notificationPermissionGranted, onNotificationPermissionChange, onMenuClicked }) => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Menu"
        onClick={onMenuClicked}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="button"
        color="inherit"
      >
        Brain
      </Typography>
      <Typography
        className={classes.flex}
        variant="button"
        color="secondary"
      >
        Wave
      </Typography>
      <WrappedLink to={Routes.About} activeClassName={classes.active} />
      <WrappedLink to={Routes.Login} />
      <WrappedNotificationCenter notifications={notifications} />
      <UserInfo
        onLogOutClicked={onLogOutClicked}
        userInfo={userInfo}
        notificationPermissionGranted={notificationPermissionGranted}
        onNotificationPermissionChange={onNotificationPermissionChange}
      />
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  ...NotificationCenter.propTypes,
  ...UserInfoComponent.propTypes,
  userInfo : PropTypes.object,
  classes : PropTypes.object.isRequired,
  onMenuClicked : PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
