import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GameIcon from 'material-ui-icons/DirectionsRun';
import { withStyles } from 'material-ui/styles';

import styles from './gameParticipationWidgetStyles';
import { Messages } from '../../shared/strings';

// todo:  Replace with Extension panel.
//        Should not be able to join game if there is no team.

const GameParticipationWidget = ({id, title, subtitle, description, startAt, joined, canJoin, onJoinGameToggled, classes}) => {
  return (
    <React.Fragment>
      <div className={classes.row}>
        <Avatar>
          <GameIcon />
        </Avatar>
        <div className={classes.title}>
          <Typography
            type="subheading"
            className={classes.gameTitle}
          >
            {title}
          </Typography>
          <Typography
            type="body1"
            className={classes.gameSubtitle}
          >
            {subtitle} — {`${startAt.getDate()}.${startAt.getMonth()+1}.${(startAt.getFullYear())}`}
          </Typography>
        </div>
      </div>
      {description &&
        <Typography
          type="body1"
          gutterBottom
        >
          {description}
        </Typography>
      }
      <div className={classes.row}>
        <Typography
          type="caption"
          color={canJoin ? 'default' : 'accent'}
        >
          {joined ? Messages.ALREADY_JOINED_GAME : (canJoin ? Messages.CAN_JOIN_GAME : Messages.CANT_JOIN_GAME)}
        </Typography>
        {canJoin &&
          <Button
            onClick={() => onJoinGameToggled(id, !joined)}
            color="secondary"
            className={classes.rowButton}
          >
            {joined ? Messages.LEAVE_GAME : Messages.JOIN_GAME}
          </Button>
        }
      </div>
    </React.Fragment>
  );
};

GameParticipationWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string,
  startAt: PropTypes.object.isRequired,
  joined: PropTypes.bool,
  canJoin: PropTypes.bool,
  onJoinGameToggled: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameParticipationWidget);
