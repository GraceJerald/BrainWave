const styles = theme => ({
  row: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowButton: {
    flexShrink: 0,
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: 'auto',
  },
  gameTitle: {
    color: 'rgba(0,0,0,0.87)',
  },
  gameSubtitle: {
    color: theme.palette.shades.light.text.secondary,
  },
});

export default styles;
