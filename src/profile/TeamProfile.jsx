import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import TeamIcon from 'material-ui-icons/Group';

import TeamRoster from './components/TeamRoster';
import MemberDataDialog from './components/MemberDataDialog';
import ErrorDisplay from '../shared/ErrorDisplay';

import styles from './profilePagesStyles';

class TeamProfile extends Component {
  state = {
    addMemberDialogOpened: false,
  };

  componentWillMount () {
    if (!this.props.team) {
      this.props.onFetchTeamRequest();
    }
  }

  handleRequstAddMemberDialog = () => {
    this.setState({addMemberDialogOpened: true});
  };

  handleAddMember = (newTeamMember) => {
    this.setState({addMemberDialogOpened: false});
    this.props.onAddMember(newTeamMember);
  };

  handleRemoveMember = (index) => {
    this.props.onRemoveMember(index);
  };

  handleCloseDialog = () => {
    this.setState({addMemberDialogOpened: false});
  };

  handleOnTitleChange = (event) => {
    this.props.onChangeTeamTitle(event.target.value);
  }

  teamProfile = () => (
    <form className={this.props.classes.form}>
      <TextField
        id="title"
        name="title"
        label="Team title"
        autoFocus
        fullWidth
        margin="dense"
        disabled={!this.props.editable}
        value={this.props.team.title}
        onChange={this.handleOnTitleChange}
        // error={this.state.errors.name ? true : false}
        // helperText={this.state.errors.name}
      />
      <Typography
        type="subheading"
        className={this.props.classes.marginTop}
      >
        Состав
      </Typography>
      <TeamRoster
        roster={this.props.team.members}
        editable={this.props.editable}
        onAddMemberClicked={this.handleRequstAddMemberDialog}
        onRemoveMemberClicked={this.handleRemoveMember}
      />
      {this.props.editable &&
        <MemberDataDialog
          open={this.state.addMemberDialogOpened}
          onSave={this.handleAddMember}
          onCancel={this.handleCloseDialog}
        />
      }
      {!this.props.editable && this.props.children}
    </form>
  )

  noTeam = () => (
    <ErrorDisplay
      Icon={TeamIcon}
      title='У вас ещё нет команды'
      caption='Но есть и хорошие новости! Вы можете создать её.'
      className={this.props.classes.placeholder}
    />
  )

  render () {
    return this.props.team ? this.teamProfile() : this.noTeam();
  }

  static get propTypes() {
    return {
      children: PropTypes.node,
      classes: PropTypes.object.isRequired,
      team: PropTypes.object,
      editable: PropTypes.bool,
      onFetchTeamRequest: PropTypes.func.isRequired,
      onAddMember: PropTypes.func.isRequired,
      onRemoveMember: PropTypes.func.isRequired,
      onChangeTeamTitle: PropTypes.func.isRequired,
    };
  }
}

export default withStyles(styles)(TeamProfile);
