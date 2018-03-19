const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputsRow: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: '0 0 50%',
  },
  sensorScheme: {
    margin: 'auto',
  },
  controlsRow: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: '1',
    justifyContent: 'flex-end',
  },
  formControl: {
    margin: theme.spacing.unit,
    flex: '1 0 120px',
  },
});

export default styles;
