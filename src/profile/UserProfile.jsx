import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonIcon from 'material-ui-icons/Person';
import PhoneIconUnverified from 'material-ui-icons/SettingsPhone';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { InputAdornment } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import PhoneVerificationDialog from './components/PhoneVerificationDialog';
import ErrorDisplay from '../shared/ErrorDisplay';
import styles from './profilePagesStyles';
import { Messages } from '../shared/strings';
import { verifier } from 'utils/firebase';

class UserProfile extends Component {

  componentDidMount () {
    if (!this.props.user) {
      this.props.onFetchUserRequest();
    }
  }

  handleVerifyPhoneClicked = () => {
    window.recaptchaVerifier = new verifier('phoneVerificationButton', {
      'size': 'invisible',
      'callback': () => {
        this.props.onVerifyPhoneClicked(this.props.user.phone);
      },
    });
    window.recaptchaVerifier.verify();
  }

  handleOnConfirm = (code) => {
    this.props.onPhoneVerificationConfirm(this.props.phoneVerificationResult, code);
  }

  handleOnCancel = () => {
    this.props.onPhoneVerificationCancel();
  }

  userProfile = () => (
    <form className={this.props.classes.form}>
      <div className={this.props.classes.inputsRow}>
        <TextField
          id="name"
          name="name"
          label="Name"
          className={this.props.classes.input}
          margin="dense"
          disabled={!this.props.editable}
          value={this.props.user.name}
          onChange={this.props.onNameChanged}
          // error={this.state.errors.name ? true : false}
          // helperText={this.state.errors.name}
        />
        <TextField
          id="surname"
          name="surname"
          label="Surname"
          className={this.props.classes.input}
          margin="dense"
          disabled={!this.props.editable}
          value={this.props.user.surname}
          onChange={this.props.onSurnameChanged}
          // error={this.state.errors.phone ? true : false}
          // helperText={this.state.errors.phone}
        />
      </div>
      <TextField
        id="group"
        name="group"
        label="Study group"
        fullWidth
        margin="dense"
        disabled={!this.props.editable}
        value={this.props.user.group}
        onChange={this.props.onGroupChanged}
        // error={this.state.errors.phone ? true : false}
        // helperText={this.state.errors.phone}
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone number"
        fullWidth
        margin="dense"
        disabled={!this.props.editable}
        InputProps={this.props.phoneVerified ? {} : {
          endAdornment:
            <InputAdornment position="end">
              <IconButton
                id='phoneVerificationButton'
                onClick={this.handleVerifyPhoneClicked}
              >
                <PhoneIconUnverified color="secondary" />
              </IconButton>
            </InputAdornment>,
        }}
        helperText={this.props.phoneVerified ? '' : 'Номер не подтверждён'}
        value={this.props.user.phone}
        onChange={this.props.onPhoneChanged}
        error={!this.props.phoneVerified}
      />
      <Typography
        type="caption"
        className={this.props.classes.marginTop}
      >
        {Messages.PHONE_DISCLAIMER}
      </Typography>
      <PhoneVerificationDialog
        open={this.props.phoneVerificationResult ? true : false}
        onConfirm={this.handleOnConfirm}
        onCancel={this.handleOnCancel}
      />
    </form>
  );

  loading = () => (
    <ErrorDisplay
      Icon={PersonIcon}
      title='Пожалуйтса, подождите'
      caption='Мы уже почти загрузили данные'
      className={this.props.classes.placeholder}
    />
  )

  render() {
    return this.props.user ? this.userProfile() : this.loading();
  }

  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      editable: PropTypes.bool,
      user: PropTypes.object,
      phoneVerified: PropTypes.bool,
      onNameChanged: PropTypes.func.isRequired,
      onSurnameChanged: PropTypes.func.isRequired,
      onGroupChanged: PropTypes.func.isRequired,
      onPhoneChanged: PropTypes.func.isRequired,
      onVerifyPhoneClicked: PropTypes.func.isRequired,
      onFetchUserRequest: PropTypes.func.isRequired,
      phoneVerificationResult: PropTypes.object,
      onPhoneVerificationConfirm: PropTypes.func.isRequired,
      onPhoneVerificationCancel: PropTypes.func.isRequired,
    };
  }
}

export default withStyles(styles)(UserProfile);
