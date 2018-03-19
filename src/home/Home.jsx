import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import ErrorIcon from 'material-ui-icons/Error';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

import PatientsContainer from '../patients/PatientsContainer';
import PageLayout from '../shared/PageLayout';
import ErrorDisplay from '../shared/ErrorDisplay';

import styles from './homeStyles';
import VisualStimuli from './components/VisualStimuli';

function getSteps() {
  return ['Select patient', 'Signal acquisition', 'Signal processing', 'Communication'];
}

class Home extends Component {

  state = {
    activeStep: 0,
  };

  getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <PatientsContainer
          variant='selectable'
          selectPatient={this.handleSelectPatient}
        />
      );
    case 1:
      return (
        <VisualStimuli />
      );
    case 2:
      return (
        <ErrorDisplay
          Icon={ErrorIcon}
          title='NIY!'
          caption='Work in progress'
        />
      );
    default:
      return 'Unknown step';
    }
  }

  isStepOptional = () => {
    return false;
  };

  handleSelectPatient = (/* patientId */) => {
    this.setState({activeStep: 1});
  }

  render () {
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <PageLayout>
        <Paper className={this.props.classes.card}>
          <Hidden xsDown>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const labelProps = {};
                if (this.isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                return (
                  <Step key={label}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Hidden>
          <Hidden smUp>
            <MobileStepper
              variant="dots"
              steps={getSteps().length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === (getSteps().length - 1)}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Hidden>
          {this.getStepContent(activeStep)}
        </Paper>
      </PageLayout>
    );
  }

  static get propTypes () {
    return {
      classes: PropTypes.object.isRequired,
    };
  }
}

export default withStyles(styles)(Home);
