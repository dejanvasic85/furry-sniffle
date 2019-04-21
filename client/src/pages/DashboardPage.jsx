import React from 'react';

import withApiClient from '../decorators/withApiClient';
import { Grid, Typography } from '@material-ui/core';

class Home extends React.Component {
  render() {
    return <>
      <Grid container justify="center" alignItems="center" spacing="12">
        <Grid item> <Typography>Coming soon</Typography></Grid>
      </Grid>
    </>;
  }
}

export default withApiClient(Home);