const styles = theme => ({
  card: theme.mixins.gutters({
    position: 'relative',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }),
});

export default styles;
