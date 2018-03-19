import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';

const PatientTable = ({patients, variant, onEditClicked, onDeleteClicked, onSelectClicked}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nave</TableCell>
          <TableCell numeric>Disability</TableCell>
          <TableCell numeric>Stimuli</TableCell>
          <TableCell numeric>Comfort</TableCell>
          <TableCell>Controls</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map(patient => {
          return (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell numeric>{patient.disability}</TableCell>
              <TableCell numeric>{patient.stimuli}</TableCell>
              <TableCell numeric>{patient.comfort}</TableCell>
              {variant === 'editable' &&
              <TableCell>
                <IconButton
                  onClick={() => onEditClicked(patient.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDeleteClicked(patient.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              }
              {variant === 'selectable' &&
              <TableCell>
                <Button
                  size="small"
                  onClick={() => onSelectClicked(patient.id)}
                >
                  Select
                </Button>
              </TableCell>
              }
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
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
