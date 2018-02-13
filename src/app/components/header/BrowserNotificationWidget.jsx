import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';

class BrowserNotificationWidget extends Component {

  static get isNotificationsSupported() {
    return ('Notification' in window);
  }

  static get isRevokeSupported() {
    return typeof navigator.permissions === 'object' && typeof navigator.permissions.revoke === 'function';
  }

  static get isNotificationDenied() {
    return Notification.permission === 'denied';
  }

  switchUnavailable = () => {
    return BrowserNotificationWidget.isNotificationDenied || (this.props.permissionGranted && !BrowserNotificationWidget.isRevokeSupported);
  }

  handleChangeNotificationPermission = () => {
    this.props.onPermissionChange(!this.props.permissionGranted);
  }

  render () {
    return (
      <List>
        <ListItem dense>
          <ListItemText primary="Включить уведомления" />
          <ListItemSecondaryAction>
            <Switch
              onClick={this.handleChangeNotificationPermission}
              checked={this.props.permissionGranted}
              disabled={this.switchUnavailable()}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }

  static get propTypes() {
    return {
      permissionGranted: PropTypes.bool,
      onPermissionChange: PropTypes.func.isRequired,
    };
  }
}

export default BrowserNotificationWidget;
