import React from 'react';
import { connect } from 'react-redux';

import { signUpRequest } from './actions';
import SignUpForm from './components/SignUpForm';
import AuthPanel from '../components/AuthPanel';

const mapStateToProps = (state) => ({
  actionString : 'Sign Up',
  queryInProgress : state.signUp.inProgress,
  isEmailRegistered : state.auth.isEmailRegistered,
});

const mapDispatchToProps = {
  signUpRequest,
};

const SignUpContainer = ({ queryInProgress, actionString, isEmailRegistered, signUpRequest }) => (
  <AuthPanel
    actionString={actionString}
    queryInProgress={queryInProgress}
  >
    <SignUpForm
      actionString={actionString}
      isEmailRegistered={isEmailRegistered}
      signUpRequest={signUpRequest}
    />
  </AuthPanel>
);

SignUpContainer.propTypes = {
  ...AuthPanel.propTypes,
  ...SignUpForm.propTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
