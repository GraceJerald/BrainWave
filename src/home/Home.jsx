import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import styles from './homeStyles';


class Home extends Component {

  render () {
    return (
      <Grid
        container
        className={this.props.classes.root}
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12}>
          Hello
        </Grid>
      </Grid>
    );
  }

  static get propTypes () {
    return {
      classes: PropTypes.object.isRequired,
    };
  }
}

export default withStyles(styles)(Home);
