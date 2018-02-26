import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

import { OperationState } from '../shared/constants';

import styles from './sensorsSetUpStyles';
import InputAcquisition from './components/InputAcquisition';
import SensorEEGScheme from './components/SensorEEGScheme';


class SensorsSetUp extends Component {
  state = {
    confirmationOpen: false,
    confirmationAction: undefined,
    disability: 0,
    stimuli: 0,
    comfort: 0,
    sensors: {},
    dry: true,
  };

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      schemas: PropTypes.object.isRequired,
      operationState: PropTypes.oneOf(Object.values(OperationState)).isRequired,
      onStoreSensorSchema: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      schemas: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.operationState === OperationState.SAVED) {
      this.setState({dry: true});
    }
  }

  handleSensorClick = (sensorId) => {
    this.setState({
      dry: false,
      sensors: {
        ...this.state.sensors,
        [sensorId]: !this.state.sensors[sensorId],
      },
    });
  };

  handleSelectChanged = (event) => {
    const pendingAction = () => this.setState({
      [event.target.name]: event.target.value,
      dry: true,
      sensors: this.getCurrentSchema({
        ...this.state,
        [event.target.name]: event.target.value,
      }),
      confirmationOpen: false,
      confirmationAction: undefined,
    });

    if (!this.state.dry) {
      this.setState({
        confirmationOpen: true,
        confirmationAction: pendingAction,
      });
    } else {
      pendingAction();
    }
  };

  getCurrentSchema = (state) => {
    const schema = this.props.schemas[`${state.disability}-${state.stimuli}-${state.comfort}`];
    return schema ? schema.sensors : {};
  }

  handleSaveSchema = () => {
    const { disability, stimuli, comfort, sensors } = this.state;
    this.props.onStoreSensorSchema({
      disability,
      stimuli,
      comfort,
      sensors,
    });
  }

  handleResetSchema = () => {
    this.setState({
      dry: true,
      sensors: this.getCurrentSchema({
        ...this.state,
      }),
    });
  }

  get isValidSelection() {
    return !!this.state.disability && !!this.state.stimuli && !!this.state.comfort;
  }

  handleCloseConfirmation = (confirmed = false) => {
    if (confirmed) {
      this.handleSaveSchema();
    }
    this.state.confirmationAction();
  }

  render () {
    return (
      <React.Fragment>
        <div style={{margin: 'auto'}}>
          <InputAcquisition
            disability={this.state.disability}
            stimuli={this.state.stimuli}
            comfort={this.state.comfort}
            disabled={this.props.operationState === OperationState.FETCHING || this.props.operationState === OperationState.SAVING }
            onSelectChanged={this.handleSelectChanged}
            className={this.props.classes.row}
          />
          <SensorEEGScheme
            schema={this.state.sensors}
            disabled={!this.isValidSelection}
            onSensorClicked={this.handleSensorClick}
          />
          <div className={this.props.classes.row}>
            <Button
              onClick={this.handleResetSchema}
              disabled={this.state.dry}
            >
              Reset
            </Button>
            <Button
              variant="raised"
              color="secondary"
              onClick={this.handleSaveSchema}
              disabled={this.state.dry}
            >
              Save
            </Button>
          </div>
        </div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.confirmationOpen}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Unsaved changes</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              You have unsaved changes in this input configuration. Do you want to save them?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCloseConfirmation(false)} color="primary">
              Ignore
            </Button>
            <Button onClick={() => this.handleCloseConfirmation(true)} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SensorsSetUp);
