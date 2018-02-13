import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import { LinearProgress, CircularProgress } from 'material-ui/Progress';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DoneIcon from 'material-ui-icons/Done';
import GroupAddIcon from 'material-ui-icons/GroupAdd';
import Zoom from 'material-ui/transitions/Zoom';
import { withStyles } from 'material-ui/styles';

import PageLayout from 'shared/PageLayout';
import UserProfile from './UserProfile';
import TeamProfile from './TeamProfile';
import GameDataProfile from './GameDataProfile';

import {
  fetchTeamRequest,
  saveTeamRequest,
  addRosterMember,
  removeRosterMember,
  changeTeamTitle,
  editTeamProfile,
  verifyPhoneRequest,
  createTeam,
  fetchUserRequest,
  editUserProfile,
  saveUserRequest,
  verifyPhoneError,
  verifyPhoneConfirm,
  joinGameRequest,
  fetchTeamGameDataRequest,
} from './actions';

import { OperationState } from '../shared/constants';

import styles from './profileStyles';

class Profile extends Component {

  state = {
    activeTab: 0,
    user: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.state.user) {
      this.setState({user: nextProps.user});
    }
  }

  componentDidMount() {
    if (this.props.user && !this.state.user) {
      this.setState({user: this.props.user});
    }
  }

  fetchTeam = () => {
    this.props.fetchTeamRequest(this.props.authUserInfo.uid);
  }

  fetchUser = () => {
    if (!this.props.user) {
      this.props.fetchUserRequest(this.props.authUserInfo.uid);
    }
  }

  createTeam = () => {
    let newTeam = {
      title: '',
      id: this.props.authUserInfo.uid,
      members: [
        {
          name: 'Вы',
          surname: '',
        },
      ],
    };
    this.props.createTeam(newTeam);
  }

  handleFABClick = () => {
    if (this.state.activeTab === 1) {
      if (!this.props.team) {
        this.createTeam();
      } else {
        if (this.isInState(OperationState.EDITING)) {
          this.props.saveTeam(this.props.team);
        } else {
          this.props.editTeamProfile();
        }
      }
    } else if (this.state.activeTab === 0) {
      if (this.isInState(OperationState.EDITING)) {
        this.props.saveUser(this.state.user);
      } else {
        this.props.editUserProfile();
      }
    }
  }

  joinGameToggled = (gameId, teamId, joined) => {
    this.props.joinGame(gameId, teamId, joined);
  }

  isInState = (operationState) => {
    return this.props.operationState === operationState;
  }

  handleTabChange = (event, activeTab) => {
    this.setState({activeTab});
  }

  handleOnUserNameChanged = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        name: event.target.value,
      },
    });
  }

  handleOnUserSurnameChanged = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        surname: event.target.value,
      },
    });
  }

  handleOnUserGroupChanged = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        group: event.target.value,
      },
    });
  }

  handleOnUserPhoneChanged = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        phone: event.target.value,
      },
    });
  }

  fabIcon = (index) => {
    if (index === 1 && !this.props.team) {
      return <GroupAddIcon />;
    } else if (this.isInState(OperationState.EDITING)) {
      return <DoneIcon />;
    } else {
      return <ModeEditIcon />;
    }
  }

  get isPhoneVerified(){
    return this.props.authUserInfo.phoneNumber
      && (this.props.user && this.props.user.phone === this.props.authUserInfo.phoneNumber);
  }

  render () {
    const transitionDuration = {
      enter: this.props.theme.transitions.duration.enteringScreen,
      exit: this.props.theme.transitions.duration.leavingScreen,
    };

    return (
      <PageLayout compact>
        <Paper className={this.props.classes.paper}>
          <LinearProgress className={this.props.classes.progress} hidden={!this.isInState(OperationState.FETCHING)}/>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleTabChange}
            indicatorcolor="secondary"
            textcolor="secondary"
            centered
            className={this.props.classes.tabContainer}
          >
            <Tab
              label="Личные данные"
              disabled={this.state.activeTab !== 0 && this.isInState(OperationState.EDITING)}
            />
            <Tab
              label="Команда"
              disabled={this.state.activeTab !== 1 && this.isInState(OperationState.EDITING)}
            />
          </Tabs>
          <Divider />
          {this.state.activeTab === 0 &&
            <UserProfile
              editable={this.isInState(OperationState.EDITING)}
              user={this.state.user}
              onFetchUserRequest={this.fetchUser}
              phoneVerified={this.isPhoneVerified}
              onVerifyPhoneClicked={this.props.verifyPhoneNumber}
              phoneVerificationResult={this.props.phoneVerificationResult}
              onNameChanged={this.handleOnUserNameChanged}
              onSurnameChanged={this.handleOnUserSurnameChanged}
              onGroupChanged={this.handleOnUserGroupChanged}
              onPhoneChanged={this.handleOnUserPhoneChanged}
              onPhoneVerificationConfirm={this.props.verifyPhoneConfirm}
              onPhoneVerificationCancel={this.props.verifyPhoneError}
            />
          }
          {this.state.activeTab === 1 &&
            <TeamProfile
              editable={this.isInState(OperationState.EDITING)}
              team={this.props.team}
              onFetchTeamRequest={this.fetchTeam}
              onAddMember={this.props.addRosterMember}
              onRemoveMember={this.props.removeRosterMember}
              onChangeTeamTitle={this.props.changeTeamTitle}
            >
              <GameDataProfile
                game={this.props.upcomingGame}
                teamId={this.props.authUserInfo.uid}
                gameData={this.props.teamGameData}
                onJoinGameToggled={this.joinGameToggled}
                onFetchGameData={this.props.fetchTeamGameDataRequest}
              />
            </TeamProfile>
          }

          {[0,1].map((fab, index) => (
            <Zoom
              appear={false}
              key={index}
              in={this.state.activeTab === index}
              timeout={transitionDuration}
              enterDelay={transitionDuration.exit}
              unmountOnExit
            >
              <Button
                fab
                className={this.props.classes.fab}
                color={this.isInState(OperationState.EDITING) ? 'default' : 'accent'}
                onClick={this.handleFABClick}
                disabled={this.isInState(OperationState.SAVING)}
              >
                {this.fabIcon(index)}
                {this.isInState(OperationState.SAVING) && <CircularProgress size={68} className={this.props.classes.fabProgress} />}
              </Button>
            </Zoom>
          ))}
        </Paper>
      </PageLayout>
    );
  }

  static get propTypes () {
    return {
      classes : PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
      operationState : PropTypes.oneOf(Object.values(OperationState)).isRequired,
      authUserInfo : PropTypes.object.isRequired,
      user : PropTypes.object,
      team : PropTypes.shape({
        id : PropTypes.string,
        title : PropTypes.string,
        members : PropTypes.array,
      }),
      upcomingGame : PropTypes.object,
      teamGameData : PropTypes.array.isRequired,
      saveTeam : PropTypes.func.isRequired,
      fetchTeamRequest : PropTypes.func.isRequired,
      fetchUserRequest : PropTypes.func.isRequired,
      createTeam : PropTypes.func.isRequired,
      addRosterMember : PropTypes.func.isRequired,
      removeRosterMember : PropTypes.func.isRequired,
      editTeamProfile : PropTypes.func.isRequired,
      changeTeamTitle : PropTypes.func.isRequired,
      saveUser : PropTypes.func.isRequired,
      editUserProfile : PropTypes.func.isRequired,
      verifyPhoneNumber : PropTypes.func.isRequired,
      phoneVerificationResult : PropTypes.object,
      verifyPhoneError : PropTypes.func.isRequired,
      verifyPhoneConfirm : PropTypes.func.isRequired,
      joinGame : PropTypes.func.isRequired,
      fetchTeamGameDataRequest : PropTypes.func.isRequired,
    };
  }
}

const mapStateToProps = (state) => ({
  authUserInfo: state.auth.userInfo,
  operationState: state.profile.operationState,
  user: state.profile.user,
  team: state.profile.team,
  upcomingGame: state.main.stage,
  teamGameData: state.profile.teamGameData,
  phoneVerificationResult: state.profile.phoneVerificationResult,
});

const mapDispatchToProps = {
  saveTeam : saveTeamRequest,
  fetchTeamRequest,
  fetchUserRequest,
  createTeam,
  addRosterMember,
  removeRosterMember,
  changeTeamTitle,
  editTeamProfile,
  saveUser : saveUserRequest,
  editUserProfile,
  verifyPhoneNumber: verifyPhoneRequest,
  verifyPhoneError,
  verifyPhoneConfirm,
  joinGame: joinGameRequest,
  fetchTeamGameDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Profile));
