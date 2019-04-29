import React from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import PageLayout from '../components/PageLayout';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  }
});

class DashboardPage extends React.Component {
  render() {
    const { classes } = this.props;
    return <PageLayout>
      <Paper className={classes.root}>
        <Typography variant="h5">Dashboard coming soon</Typography>
      </Paper>
    </PageLayout>;
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);