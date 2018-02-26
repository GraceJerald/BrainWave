import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import { withStyles } from 'material-ui/styles';

import styles from './inputAcquisitionStyles';

const InputAcquisition = ({disability, stimuli, comfort, disabled, onSelectChanged, className, classes}) => {
  return (
    <div className={className}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="disability-level">Disability level</InputLabel>
        <Select
          value={disability}
          disabled={disabled}
          onChange={onSelectChanged}
          inputProps={{
            id: 'disability-level',
            name: 'disability',
          }}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="stimuli-type">Stimuli type</InputLabel>
        <Select
          value={stimuli}
          disabled={disabled}
          onChange={onSelectChanged}
          inputProps={{
            id: 'stimuli-type',
            name: 'stimuli',
          }}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="comfort-level">Comfort level</InputLabel>
        <Select
          value={comfort}
          disabled={disabled}
          onChange={onSelectChanged}
          inputProps={{
            id: 'comfort-level',
            name: 'comfort',
          }}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

InputAcquisition.propTypes = {
  disability: PropTypes.number.isRequired,
  stimuli: PropTypes.number.isRequired,
  comfort: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onSelectChanged: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAcquisition);
