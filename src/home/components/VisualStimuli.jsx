import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import styles from './visualStimuliStyles';

const Stimulus = ({flickFrequency, classes, children}) => (
  <Paper
    className={classes.paper}
    style={{['--flickering-period']: `${1 / flickFrequency}ms`}}
  >
    <div className={classes.stimulusContent}>
      {children}
    </div>
  </Paper>
);

Stimulus.defaultProps = {
  flickFrequency: 0,
};

Stimulus.propTypes = {
  flickFrequency: PropTypes.number,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const StyledStimulus = withStyles(styles)(Stimulus);

const stimuli = ['Eins', 'Zwei', 'Drei', 'Vier', 'Funf', 'Sechs'];

const VisualStimuli = () => {
  return (
    <Grid container spacing={24}>
      {stimuli.map((simulus, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <StyledStimulus flickFrequency={7 + 2 * index}>{simulus}</StyledStimulus>
        </Grid>
      ))}
    </Grid>
  );
};

export default VisualStimuli;
