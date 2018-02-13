import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import Avatar from 'material-ui/Avatar';
import InfoIcon from 'material-ui-icons/Info';
import WarningIcon from 'material-ui-icons/Warning';

import { withStyles } from 'material-ui/styles';

import styles from './notificationCenterStyles';

const NotificationType = {
  INFO: 0,
  WARNING: 1,
};

const Transition = props => <Slide direction="up" {...props} />;

class NotificationCenter extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render () {
    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleClickOpen}
          color="inherit"
        >
          {this.props.notifications.length === 0 && <MailIcon />}
          {this.props.notifications.length !== 0 &&
            <Badge badgeContent={this.props.notifications.length} color="primary">
              <MailIcon />
            </Badge>
          }
        </IconButton>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
          transition={Transition}
        >
          <AppBar className={this.props.classes.appBar}>
            <Toolbar>
              <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={this.props.classes.title}>
                Notifications
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {this.props.notifications.map((notification, index) => (
              <ListItem button key={index}>
                <Avatar
                  className={classNames({[this.props.classes.accent]: notification.type == NotificationType.WARNING})}
                >
                  {notification.type == NotificationType.INFO ? <InfoIcon /> : <WarningIcon />}
                </Avatar>
                <ListItemText primary={notification.title} secondary={notification.body} />
              </ListItem>
            ))}
          </List>
        </Dialog>
      </React.Fragment>
    );
  }

  static propTypes = {
    notifications : PropTypes.array.isRequired,
    classes : PropTypes.object.isRequired,
  }
}

export default withStyles(styles)(NotificationCenter);
