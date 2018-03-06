import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Patients from './Patients';

import {
  fetchPatientsRequest,
  savePatientRequest,
  deletePatientRequest,
} from './actions';

const mapStateToProps = (state) => ({
  patients: state.patients.patients,
  operationState: state.settings.operationState,
});

const mapDispatchToProps = {
  fetchPatients: fetchPatientsRequest,
  savePatient: savePatientRequest,
  deletePatient: deletePatientRequest,
};

export class PatientsContainer extends Component {

  componentWillMount() {
    this.props.fetchPatients();
  }

  render = () => {
    return (
      <Patients
        patients={this.props.patients}
        operationState={this.props.operationState}
        savePatient={this.props.savePatient}
        deletePatient={this.props.deletePatient}
      />
    );
  }

  static get propTypes() {
    return {
      ...Patients.propTypes,
      fetchPatients: PropTypes.func.isRequired,
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
