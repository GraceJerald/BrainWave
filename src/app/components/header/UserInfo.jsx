import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Routes from '../../routes';

import { withStyles } from 'material-ui/styles';

import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import BrowserNotificationWidget from './BrowserNotificationWidget';

const styles = theme => ({
  popover: {
    minWidth: '300px',
  },
  content: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  actions: {
    padding: theme.spacing.unit,
  },
});

class UserInfo extends Component {
  state = {
    open : false,
    anchor : {},
  }

  handleClickOpen = (e) => {
    this.setState({
      open: !this.state.open,
      anchor: e.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render () {
    return (
      <div>
        <IconButton
          color="inherit"
          onClick={this.handleClickOpen}
        >
          <AccountCircle />
        </IconButton>
        <Popover
          anchorEl={this.state.anchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          onClose={this.handleClose}
          classes={{
            paper: this.props.classes.popover,
          }}
        >
          {BrowserNotificationWidget.isNotificationsSupported &&
          <BrowserNotificationWidget
            permissionGranted={this.props.notificationPermissionGranted}
            onPermissionChange={this.props.onNotificationPermissionChange}
          />}

          <Typography className={this.props.classes.content}>The content of the Popover.</Typography>

          <div className={this.props.classes.actions}>
            <NavLink to={Routes.Team.path}>
              <Button
                dense
                disableRipple
                onClick={this.handleClose}
              >
                Профиль
              </Button>
            </NavLink>
            <Button
              dense
              disableRipple
              onClick={this.props.onLogOutClicked}
            >
              Выход
            </Button>
          </div>
        </Popover>
      </div>
    );
  }

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      notificationPermissionGranted: PropTypes.bool,
      onNotificationPermissionChange: PropTypes.func.isRequired,
      onLogOutClicked: PropTypes.func.isRequired,
    };
  }
}

export default withStyles(styles)(UserInfo);
