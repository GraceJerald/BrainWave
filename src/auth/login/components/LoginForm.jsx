import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import Routes from 'app/routes';
import { validateEmail, validatePassword } from '../../../utils/validation/userValidation.js';

import styles from '../../authFormsStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user : {
        email : '',
        password : '',
      },
      errors : {
        email : null,
        password : null,
      },
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.loginRequest(this.state.user);
  }

  handleOnEmailChange = (event) => {
    const validationResult = validateEmail(event.target.value);

    this.setState({
      user : {
        ...this.state.user,
        email : event.target.value,
      },
      errors : {
        ...this.state.errors,
        email : validationResult.firstErrorMessageIfAny,
      },
    });
  }

  handleOnPasswordChange = (event) => {
    const validationResult = validatePassword(event.target.value);

    this.setState({
      user : {
        ...this.state.user,
        password : event.target.value,
      },
      errors : {
        ...this.state.errors,
        password : validationResult.firstErrorMessageIfAny,
      },
    });
  }

  isInputValid = () => {
    return Object.values(this.state.errors)
      .every((err) => err === null);
  }

  render = () => {
    const formValid = this.isInputValid();

    return (
      <form onSubmit={this.handleOnSubmit} className={this.props.classes.form}>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="dense"
          value={this.state.user.email}
          onChange={this.handleOnEmailChange}
          error={this.state.errors.email ? true : false}
          helperText={this.state.errors.email}
        />

        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          fullWidth
          margin="dense"
          value={this.state.user.password}
          onChange={this.handleOnPasswordChange}
          error={this.state.errors.password ? true : false}
          helperText={this.state.errors.password}
        />
        <div className={this.props.classes.formActions}>
          <Link to={Routes.ResetPassword.path} >
            <Typography variant="caption" color="secondary">{Routes.ResetPassword.text}</Typography>
          </Link>
          <div>
            <Link to={Routes.SignUp.path}>
              <Button
                className={this.props.classes.button}
                disableRipple
              >
                {Routes.SignUp.text}
              </Button>
            </Link>
            <Button
              type="submit"
              variant="raised"
              color="secondary"
              disabled={!formValid}
            >
              {this.props.actionString}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  actionString : PropTypes.string.isRequired,
  loginRequest : PropTypes.func.isRequired,
  classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
