import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import StarIcon from 'material-ui-icons/Star';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';

import styles from './teamRosterStyles';

const TeamRoster = ({editable, roster, classes, onAddMemberClicked, onRemoveMemberClicked}) => {
  return (
    <div className={classes.rosterRow}>
      {roster.map((member, index) => (
        <Chip
          key={index}
          onDelete={(!editable || index === 0) ? undefined : () => onRemoveMemberClicked(index)}
          avatar={
            <Avatar>
              {index === 0 ? <StarIcon /> : <PersonIcon />}
            </Avatar>
          }
          label={`${member.name} ${member.surname}`}
          classes={{
            root: classes.chip,
            avatar: index === 0 ? classes.avatar : '',
          }}
        />
      ))}
      {editable &&
        <Button
          fab
          color="secondary"
          className={classes.addMember}
          aria-label="add"
          onClick={onAddMemberClicked}
        >
          <AddIcon />
        </Button>
      }
    </div>
  );
};

TeamRoster.defaultProps = {
  roster: [],
};

TeamRoster.propTypes = {
  editable: PropTypes.bool,
  roster: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onAddMemberClicked: PropTypes.func.isRequired,
  onRemoveMemberClicked: PropTypes.func.isRequired,
};

export default withStyles(styles)(TeamRoster);
