const styles = theme => ({
  form: theme.mixins.gutters({
    height: '100%',
    overflowY: 'auto',
    paddingBottom: theme.spacing.unit * 2,
  }),
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
  marginTop: {
    marginTop: theme.spacing.unit * 2,
  },
  placeholder: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 6,
    height: '100%',
  },
});

export default styles;
