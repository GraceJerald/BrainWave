import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import { withStyles } from 'material-ui/styles';

import { OperationState } from '../shared/constants';

import PatientDataDialog from './components/PatientDataDialog';
import styles from './patientsStyles';

import PatientList from './components/PatientList';
import PatientTable from './components/PatientTable';

const PatientView = (props) => (
  <React.Fragment>
    <Hidden xsDown>
      <PatientTable
        {...props}
      />
    </Hidden>
    <Hidden smUp>
      <PatientList
        {...props}
      />
    </Hidden>
  </React.Fragment>
);


class Patients extends Component {
  state = {
    patientDialogInitialData: undefined,
    patientDialogOpened: false,
  };

  static get propTypes() {
    return {
      variant: PropTypes.string.isRequired,
      classes: PropTypes.object.isRequired,
      patients: PropTypes.array.isRequired,
      operationState: PropTypes.oneOf(Object.values(OperationState)).isRequired,
      savePatient: PropTypes.func.isRequired,
      deletePatient: PropTypes.func.isRequired,
      selectPatient: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      patients: [],
    };
  }

  handleAddPatientClick = () => {
    this.setState({patientDialogOpened: true});
  }

  handleSavePatient = (patient) => {
    this.props.savePatient(patient);
    this.handleCloseDialog();
  }

  handleCloseDialog = () => {
    this.setState({
      patientDialogOpened: false,
      patientDialogInitialData: undefined,
    });
  }

  handleEditPatientClicked = (patientId) => {
    const patient = this.props.patients.find((p) => p.id === patientId);
    this.setState({
      patientDialogOpened: true,
      patientDialogInitialData: patient,
    });
  }

  render () {
    return (
      <React.Fragment>
        <PatientView
          patients={this.props.patients}
          variant={this.props.variant}
          onEditClicked={this.handleEditPatientClicked}
          onDeleteClicked={this.props.deletePatient}
          onSelectClicked={this.props.selectPatient}
        />
        <PatientDataDialog
          open={this.state.patientDialogOpened}
          onSave={this.handleSavePatient}
          onCancel={this.handleCloseDialog}
          initialData={this.state.patientDialogInitialData}
        />
        {this.props.variant === 'editable' &&
        <div className={this.props.classes.row}>
          <Button
            size="small"
            onClick={this.handleAddPatientClick}
          >
            Add patient
          </Button>
        </div>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Patients);
