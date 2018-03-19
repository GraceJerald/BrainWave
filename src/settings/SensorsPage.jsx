import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import PageLayout from '../shared/PageLayout';
import SensorsSetUpContainer from './SensorsSetUpContainer';

import styles from './sensorsPageStyles';

const SensorsPage = ({classes}) => {
  return (
    <PageLayout>
      <Paper className={classes.card}>
        <Typography variant="headline" component="h3">Sensors set-up</Typography>
        <SensorsSetUpContainer />
      </Paper>
    </PageLayout>
  );
};

SensorsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorsPage);
