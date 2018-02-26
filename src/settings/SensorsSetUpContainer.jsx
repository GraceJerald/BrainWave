import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SensorsSetUp from './SensorsSetUp';

import { fetchSensorSchemasRequest, storeSensorSchemaRequest } from './actions';
// import { OperationState } from '../../shared/constants';

const mapStateToProps = (state) => ({
  schemas: state.settings.schemas,
  operationState: state.settings.operationState,
});

const mapDispatchToProps = {
  fetchSensorSchemas: fetchSensorSchemasRequest,
  storeSensorSchema: storeSensorSchemaRequest,
};

export class SensorsSetUpContainer extends Component {

  componentWillMount() {
    this.props.fetchSensorSchemas();
  }

  render = () => {
    return (
      <SensorsSetUp
        schemas={this.props.schemas}
        operationState={this.props.operationState}
        onStoreSensorSchema={this.props.storeSensorSchema}
      />
    );
  }

  static get propTypes() {
    return {
      ...SensorsSetUp.propTypes,
      fetchSensorSchemas: PropTypes.func.isRequired,
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SensorsSetUpContainer);
