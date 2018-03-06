import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import { withStyles } from 'material-ui/styles';

import { OperationState } from '../shared/constants';

import PatientDataDialog from './components/PatientDataDialog';
import styles from './patientsStyles';


class Patients extends Component {
  state = {
    patientDialogInitialData: undefined,
    patientDialogOpened: false,
  };

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      patients: PropTypes.array.isRequired,
      operationState: PropTypes.oneOf(Object.values(OperationState)).isRequired,
      savePatient: PropTypes.func.isRequired,
      deletePatient: PropTypes.func.isRequired,
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
        <Table className={this.props.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nave</TableCell>
              <TableCell numeric>Disability</TableCell>
              <TableCell numeric>Stimuli</TableCell>
              <TableCell numeric>Comfort</TableCell>
              <TableCell>Controls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.patients.map(patient => {
              return (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell numeric>{patient.disability}</TableCell>
                  <TableCell numeric>{patient.stimuli}</TableCell>
                  <TableCell numeric>{patient.comfort}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => this.handleEditPatientClicked(patient.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => this.props.deletePatient(patient.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Button
                size="small"
                onClick={this.handleAddPatientClick}
              >
                Add patient
              </Button>
            </TableRow>
          </TableFooter>
        </Table>
        <PatientDataDialog
          open={this.state.patientDialogOpened}
          onSave={this.handleSavePatient}
          onCancel={this.handleCloseDialog}
          initialData={this.state.patientDialogInitialData}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Patients);
