import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import { withStyles } from 'material-ui/styles';
import InputAcquisition from '../../settings/components/InputAcquisition';

import styles from './patientDataDialogStyles';

class PatientDataDialog extends Component {

  static get initialState () {
    return {
      name: '',
      disability: 0,
      stimuli: 0,
      comfort: 0,
    };
  }

  state = PatientDataDialog.initialState;

  componentWillReceiveProps (nextProps) {
    if (nextProps.initialData) {
      this.setState(nextProps.initialData);
    } else {
      this.setState(PatientDataDialog.initialState);
    }
  }

  handleCancel = () => {
    this.props.onCancel();
    this.setState(PatientDataDialog.initialState);
  }

  handleAdd = () => {
    this.props.onSave(this.state);
    this.setState(PatientDataDialog.initialState);
  }

  handleOnNameChange = (event) => {
    this.setState({
      ...this.state,
      name : event.target.value,
    });
  }

  handleSelectChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
      >
        <DialogTitle>Patient data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Description
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Name"
            value={this.state.name}
            onChange={this.handleOnNameChange}
            fullWidth
            margin="dense"
          />
          <InputAcquisition
            disability={this.state.disability}
            stimuli={this.state.stimuli}
            comfort={this.state.comfort}
            onSelectChanged={this.handleSelectChanged}
            className={this.props.classes.row}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>
            Отмена
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            {this.props.initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  static get propTypes() {
    return {
      ...Dialog.propTypes,
      initialData : PropTypes.object,
      onSave : PropTypes.func.isRequired,
      onCancel : PropTypes.func.isRequired,
      classes : PropTypes.object.isRequired,
    };
  }
}

export default withStyles(styles)(PatientDataDialog);
