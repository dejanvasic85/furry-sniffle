import React from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  }
});

export class DashboardPage extends React.Component {
  render() {
    const { classes } = this.props;
    return <Paper className={classes.root}>
      <Typography variant="h5">Dashboard coming soon</Typography>
    </Paper>;
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);