const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  '@keyframes stimulus-flick': {
    from: {opacity: 0},
    to: {opacity: 1},
  },
  stimulusContent: {
    animation: 'stimulus-flick var(--flickering-period) linear infinite alternate',
  },
});

export default styles;
