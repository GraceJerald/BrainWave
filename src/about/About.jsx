import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';
import PageLayout from 'shared/PageLayout';

const styles = theme => ({
  card: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
});

const About = ({classes}) => (
  <PageLayout>
    <Paper className={classes.card}>
      <Typography variant="headline" component="h3">
        About BrainWave
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum fermentum odio, a tristique elit blandit nec. Fusce tincidunt cursus consequat. Phasellus eget erat quis enim bibendum hendrerit. Pellentesque rhoncus eget mauris non lobortis. Vivamus sem orci, iaculis ac euismod in, rhoncus vel dui. Quisque in ipsum ut ligula posuere porttitor. Praesent lacinia vitae eros vitae tincidunt. Vivamus posuere enim vel dolor posuere feugiat. Proin cursus, libero sit amet luctus sodales, ipsum felis rutrum justo, vitae laoreet enim magna et sapien. Phasellus eu quam at magna tincidunt dignissim ac id ante. Morbi ex nisl, fringilla a massa sit amet, volutpat congue mi. Duis at elementum lacus, egestas vestibulum erat. In elementum nulla nec turpis tristique bibendum. Morbi eget pellentesque leo.
      </Typography>
      <br />
      <Typography variant="body2" component="p">
        Phasellus at metus sapien. Sed leo mauris, tempor eu eros sit amet, interdum sollicitudin purus. Etiam in dui placerat, vestibulum quam non, tincidunt sem. Maecenas suscipit tincidunt pellentesque. Mauris quam urna, imperdiet sed enim et, malesuada tempor mauris. Nullam sagittis efficitur ipsum. Maecenas nec egestas magna. Proin fringilla leo quis augue faucibus, ac iaculis velit rutrum. Donec suscipit leo at eros interdum dictum.
      </Typography>
      <br />
      <Button
        variant="raised"
        color="secondary"
      >
        Got it!
      </Button>
    </Paper>
  </PageLayout>
);

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
