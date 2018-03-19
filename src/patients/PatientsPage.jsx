import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import PageLayout from '../shared/PageLayout';
import PatientsContainer from './PatientsContainer';

import styles from './patientsPageStyles';

const PatientsPage = ({classes}) => {
  return (
    <PageLayout>
      <Paper className={classes.card}>
        <Typography variant="headline" component="h3">Patient list</Typography>
        <PatientsContainer variant="editable" />
      </Paper>
    </PageLayout>
  );
};

PatientsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientsPage);
