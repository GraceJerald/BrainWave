import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginRequest } from './actions';
import LoginForm from './components/LoginForm';
import AuthPanel from '../components/AuthPanel';

const mapStateToProps = (state) => ({
  actionString : 'Log In',
  queryInProgress : state.login.isLoginInProcess,
});

const mapDispatchToProps = ({
  loginRequest,
});

export class LoginContainer extends Component {
  render = () => {
    return (
      <AuthPanel
        actionString={this.props.actionString}
        queryInProgress={this.props.queryInProgress}
      >
        <LoginForm
          actionString={this.props.actionString}
          loginRequest={this.props.loginRequest}
        />
      </AuthPanel>
    );
  }
}

LoginContainer.propTypes = {
  ...AuthPanel.propTypes,
  ...LoginForm.propTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
