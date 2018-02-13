import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles' ;

import PageLayout from 'shared/PageLayout';

import styles from './authPanelStyles';

class AuthPanel extends Component {
  render() {
    return (
      <PageLayout compact>
        <Paper className={this.props.classes.card}>
          <LinearProgress className={this.props.classes.progress} hidden={!this.props.queryInProgress}/>
          <Typography variant="headline" component="h3">{this.props.actionString}</Typography>
          {this.props.children}
        </Paper>
      </PageLayout>
    );
  }
}

AuthPanel.defaultProps = {
  queryInProgress : false,
};

AuthPanel.propTypes = {
  classes : PropTypes.object.isRequired,
  actionString : PropTypes.string.isRequired,
  queryInProgress : PropTypes.bool.isRequired,
  children : PropTypes.node,
};

export default withStyles(styles)(AuthPanel);
