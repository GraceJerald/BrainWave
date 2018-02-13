const styles = theme => ({
  paper: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
  },
  fab: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      top: -28,
      right: 16,
    },
    [theme.breakpoints.down('sm')]: {
      bottom: 16,
      right: 16,
    },
  },
  fabProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
});

export default styles;
