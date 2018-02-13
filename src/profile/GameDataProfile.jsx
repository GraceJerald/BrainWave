import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import GameParticipationWidget from './components/GameParticipationWidget';

import styles from './profilePagesStyles';

class GameDataProfile extends Component {

  componentWillMount () {
    if (!this.props.gameData.length) {
      this.props.onFetchGameData(this.props.teamId);
    }
  }

  handleJoinGameToggled = (gameId, joined) => {
    this.props.onJoinGameToggled(gameId, this.props.teamId, joined);
  };

  get isJoinedUpcomingGame() {
    return this.props.gameData
      .filter(gameStatus => gameStatus.id === this.props.game.id)
      .length > 0;
  }

  render () {
    return (
      <React.Fragment>
        <Typography
          type="subheading"
          className={this.props.classes.marginTop}
          gutterBottom
        >
          Ближайшая игра
        </Typography>
        <GameParticipationWidget
          id={this.props.game.id}
          title={this.props.game.title}
          subtitle={this.props.game.subtitle}
          description={this.props.game.description}
          startAt={this.props.game.startAt}
          onJoinGameToggled={this.handleJoinGameToggled}
          canJoin={this.props.game.open}
          joined={this.isJoinedUpcomingGame}
        />
      </React.Fragment>
    );
  }

  static get propTypes() {
    return {
      game: PropTypes.object.isRequired,
      teamId: PropTypes.string.isRequired,
      gameData: PropTypes.array.isRequired,
      classes: PropTypes.object.isRequired,
      onJoinGameToggled: PropTypes.func.isRequired,
      onFetchGameData: PropTypes.func.isRequired,
    };
  }
}

export default withStyles(styles)(GameDataProfile);
