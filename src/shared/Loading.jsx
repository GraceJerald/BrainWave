import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = {
  center: {
    alignSelf: 'center',
    margin: 'auto',
  },
};

const Loading = ({classes}) => (
  <CircularProgress className={classes.center} />
);

Loading.propTypes = {
  classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
