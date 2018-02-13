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

class MemberDataDialog extends Component {

  static get initialState () {
    return {
      name: '',
      surname: '',
      group: '',
    };
  }

  state = MemberDataDialog.initialState;

  componentWillReceiveProps (nextProps) {
    if (nextProps.initialData) {
      this.setState(nextProps.initialData);
    } else {
      this.setState(MemberDataDialog.initialState);
    }
  }

  handleCancel = () => {
    this.props.onCancel();
    this.setState(MemberDataDialog.initialState);
  }

  handleAdd = () => {
    this.props.onSave(this.state);
    this.setState(MemberDataDialog.initialState);
  }

  handleOnNameChange = (event) => {
    this.setState({
      ...this.state,
      name : event.target.value,
    });
  }

  handleOnSurnameChange = (event) => {
    this.setState({
      ...this.state,
      surname : event.target.value,
    });
  }

  handleOnGroupChange = (event) => {
    this.setState({
      ...this.state,
      group : event.target.value,
    });
  }

  render () {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
      >
        <DialogTitle>Данные участника</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, указывайте точную информацию об участниках.
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            name="name"
            label="Имя"
            value={this.state.name}
            onChange={this.handleOnNameChange}
            fullWidth
            margin="dense"
          />
          <TextField
            id="surname"
            name="surname"
            label="Фамилия"
            value={this.state.surname}
            onChange={this.handleOnSurnameChange}
            fullWidth
            margin="dense"
          />
          <TextField
            id="group"
            name="group"
            label="Группа"
            value={this.state.group}
            onChange={this.handleOnGroupChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>
            Отмена
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            {this.props.initialData ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  static get propTypes() {
    return {
      ...Dialog.propTypes,
      initialData : PropTypes.object,
      onSave : PropTypes.func.isRequired,
      onCancel : PropTypes.func.isRequired,
    };
  }
}

export default MemberDataDialog;
