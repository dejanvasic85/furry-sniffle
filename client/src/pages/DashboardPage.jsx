import React from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles } from '@material-ui/core';

import withApiClient from '../decorators/withApiClient';
import PageLayout from '../components/PageLayout';

const styles = theme => ({
  root: {}
});

class DashboardPage extends React.Component {
  render() {
    return <PageLayout>
      <Paper>
        <Typography>Dashboard coming soon</Typography>
      </Paper>
    </PageLayout>;
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);