const styles = theme => ({
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  inputsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      minWidth: `calc(50% - ${theme.spacing.unit}px)`,
      '& + &': {
        marginLeft: theme.spacing.unit,
      },
    },
  },
  formActions: {
    marginTop: '2em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  },
  actionButtons: {
    marginLeft: 'auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export default styles;
