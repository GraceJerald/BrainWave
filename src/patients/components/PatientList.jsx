import React from 'react';
import PropTypes from 'prop-types';

// import Button from 'material-ui/Button';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

const PatientTable = ({patients, variant, onEditClicked, onDeleteClicked, onSelectClicked}) => {
  return (
    <List>
      {patients.map(patient => (
        <ListItem
          key={patient.id}
          role={undefined}
          dense
          button={variant === 'selectable'}
          onClick={variant === 'selectable' ? () => onSelectClicked(patient.id) : undefined}
        >
          <ListItemText primary={patient.name} secondary={`D: ${patient.disability} S: ${patient.stimuli} C: ${patient.comfort}`}/>
          {variant === 'editable' &&
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit patient"
              onClick={() => onEditClicked(patient.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete patient"
              onClick={() => onDeleteClicked(patient.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
          }
        </ListItem>
      ))}
    </List>
  );
};

PatientTable.propTypes = {
  patients: PropTypes.array.isRequired,
  variant: PropTypes.string.isRequired,
  onEditClicked: PropTypes.func,
  onDeleteClicked: PropTypes.func,
  onSelectClicked: PropTypes.func,
};

export default PatientTable;
