import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class PhoneVerificationDialog extends Component {

  static get initialState () {
    return {
      code: '',
    };
  }

  state = PhoneVerificationDialog.initialState;

  handleCancel = () => {
    this.props.onCancel();
    this.setState(PhoneVerificationDialog.initialState);
  }

  handleConfirm = () => {
    this.props.onConfirm(this.state.code);
    this.setState(PhoneVerificationDialog.initialState);
  }

  handleOnCodeChange = (event) => {
    this.setState({
      code : event.target.value,
    });
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
      >
        <DialogTitle>Подтверждение номера телефона</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите код, отправленный на ваш мобильный.
          </DialogContentText>
          <TextField
            autoFocus
            id="code"
            name="code"
            label="Код подтверждения"
            value={this.state.code}
            onChange={this.handleOnCodeChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>
            Отмена
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  static get propTypes() {
    return {
      ...Dialog.propTypes,
      onConfirm : PropTypes.func.isRequired,
      onCancel : PropTypes.func.isRequired,
    };
  }
}

export default PhoneVerificationDialog;
