import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  icon: {
    width: 64,
    height: 64,
    opacity: 0.5,
    marginBottom: 16,
  },
};

const ErrorDisplay = ({Icon, title, caption, classes, className}) => {
  return (
    <div className={classNames(classes.root, className)}>
      <Icon className={classes.icon}/>
      <Typography variant="subheading">{title}</Typography>
      {caption && <Typography variant="caption">{caption}</Typography>}
    </div>
  );
};

ErrorDisplay.propTypes = {
  Icon: PropTypes.func,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ErrorDisplay);
