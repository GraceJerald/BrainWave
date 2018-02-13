import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import Routes from 'app/routes';
import { validateEmail } from '../../../utils/validation/userValidation.js';

import styles from '../../authFormsStyles';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email : '',
      errors : {
        email : null,
      },
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.resetPasswordRequest(this.state.email);
  }

  handleOnEmailChange = (event) => {
    const validationResult = validateEmail(event.target.value);

    this.setState({
      email : event.target.value,
      errors : {
        ...this.state.errors,
        email : validationResult.firstErrorMessageIfAny,
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
          value={this.state.email}
          onChange={this.handleOnEmailChange}
          error={this.state.errors.email ? true : false}
          helperText={this.state.errors.email}
        />
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
              type="submit"
              disabled={!formValid}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  resetPasswordRequest : PropTypes.func.isRequired,
  classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPasswordForm);
