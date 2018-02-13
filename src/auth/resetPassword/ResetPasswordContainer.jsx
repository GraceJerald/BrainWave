import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthPanel from '../components/AuthPanel';
import ResetPasswordForm from './components/ResetPasswordForm';
import { resetPasswordRequest } from './actions';
import { OperationState } from '../../shared/constants';

const mapStateToProps = (state) => ({
  actionString : 'Reset password',
  operationState : state.resetPassword.resetOperationState,
});

const mapDispatchToProps = {
  resetPasswordRequest,
};

export class ResetPasswordContainer extends Component {
  render = () => {
    return (
      <AuthPanel
        actionString={this.props.actionString}
        queryInProgress={this.props.operationState === OperationState.SAVING}
      >
        <ResetPasswordForm
          resetPasswordRequest={this.props.resetPasswordRequest}
          isEmailRegistered={this.props.isEmailRegistered}
        />
      </AuthPanel>
    );
  }
}

ResetPasswordContainer.propTypes = {
  ...AuthPanel.propTypes,
  ...ResetPasswordForm.propTypes,
  operationState : PropTypes.oneOf(Object.values(OperationState)).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
