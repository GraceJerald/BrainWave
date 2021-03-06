import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

import styles from './sensorEEGSchemeStyles';

const SensorEEGScheme = ({classes, className, schema, disabled, onSensorClicked}) => (
  <div className={classNames(classes.root, className)}>
    <div className={classes.cross} />
    {
      Array.apply(0, Array(21)).map((_, index) => (
        <Checkbox
          key={index}
          className={classes.sensor}
          checked={schema[index] ? true : false}
          disabled={disabled}
          onChange={() => onSensorClicked(index)}
        />
      ))
    }
  </div>
);

SensorEEGScheme.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onSensorClicked: PropTypes.func.isRequired,
};

export default withStyles(styles)(SensorEEGScheme);
