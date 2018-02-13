import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  centered: {
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
  },
  fullVerticalGrow: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const PageLayout = ({classes, className, compact, ...restProps}) => (
  <Grid container justify="center" spacing={0} className={classNames(classes.centered, className)}>
    <Grid
      item
      xs={12}
      sm={compact ? 6 : 12}
      md={compact ? 4 : 8}
      lg={compact ? 4 : 6}
      className={classes.fullVerticalGrow}
      {...restProps}
    />
  </Grid>
);

PageLayout.propTypes = {
  compact: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(PageLayout);
