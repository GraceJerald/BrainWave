import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import Routes from 'app/routes';

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmationPassword,
} from '../../../utils/validation/userValidation';

import styles from '../../authFormsStyles';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user : {
        name : '',
        surname : '',
        email : '',
        password : '',
        confirmationPassword : '',
      },
      errors : {
        name : null,
        surname : null,
        email : null,
        password : null,
        confirmationPassword : null,
      },
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.signUpRequest(this.state.user);
  }

  makeConfirmationPasswordValidation = (password, confirmationPassword) => {
    const validationResult = validateConfirmationPassword(password, confirmationPassword);

    this.setState({
      errors : {
        ...this.state.errors,
        confirmationPassword : validationResult.firstErrorMessageIfAny,
      },
    });
  }

  handleOnNameChange = (event) => {
    const validationResult = validateName(event.target.value);

    this.setState({
      user : {
        ...this.state.user,
        name : event.target.value,
      },
      errors : {
        ...this.state.errors,
        name : validationResult.firstErrorMessageIfAny,
      },
    });
  }

  handleOnSurnameChange = (event) => {
    this.setState({
      user : {
        ...this.state.user,
        surname : event.target.value,
      },
    });
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
    const validationInfo = validatePassword(event.target.value);

    if (validationInfo.isValid) {
      this.makeConfirmationPasswordValidation(event.target.value,
        this.state.user.confirmationPassword);
    }

    this.setState({
      user : {
        ...this.state.user,
        password : event.target.value,
      },
      errors : {
        ...this.state.errors,
        password : validationInfo.firstErrorMessageIfAny,
      },
    });
  }

  handleOnConfirmationPasswordChange = (event) => {
    this.makeConfirmationPasswordValidation(this.state.user.password, event.target.value);
    this.setState({ user : { ...this.state.user, confirmationPassword : event.target.value}});
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
          required
          fullWidth
          margin="dense"
          value={this.state.user.email}
          onChange={this.handleOnEmailChange}
          error={this.state.errors.email ? true : false}
          helperText={this.state.errors.email}
        />

        <div className={this.props.classes.inputsRow}>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            margin="dense"
            className={this.props.classes.input}
            value={this.state.user.password}
            onChange={this.handleOnPasswordChange}
            error={this.state.errors.password ? true : false}
            helperText={this.state.errors.password}
          />
          <TextField
            id="confirmationPassword"
            name="confirmationPassword"
            type="password"
            label="Confirm password"
            margin="dense"
            className={this.props.classes.input}
            value={this.state.user.confirmationPassword}
            onChange={this.handleOnConfirmationPasswordChange}
            error={this.state.errors.confirmationPassword ? true : false}
            helperText={this.state.errors.confirmationPassword}
          />
        </div>

        <div className={this.props.classes.inputsRow}>
          <TextField
            id="name"
            name="name"
            label="Name"
            className={this.props.classes.input}
            margin="dense"
            value={this.state.user.name}
            onChange={this.handleOnNameChange}
            error={this.state.errors.name ? true : false}
            helperText={this.state.errors.name}
          />
          <TextField
            id="surname"
            name="surname"
            label="Surname"
            className={this.props.classes.input}
            margin="dense"
            value={this.state.user.surname}
            onChange={this.handleOnSurnameChange}
            error={this.state.errors.surname ? true : false}
            helperText={this.state.errors.surname}
          />
        </div>
        <div className={this.props.classes.formActions}>
          <div className={this.props.classes.actionButtons}>
            <Link to={Routes.Login.path}>
              <Button
                className={this.props.classes.button}
                disableRipple
              >
                {Routes.Login.text}
              </Button>
            </Link>
            <Button
              variant="raised"
              type="submit"
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

SignUpForm.propTypes = {
  classes : PropTypes.object,
  actionString : PropTypes.string.isRequired,
  isEmailRegistered : PropTypes.bool,
  signUpRequest : PropTypes.func.isRequired,
};

export default withStyles(styles)(SignUpForm);
