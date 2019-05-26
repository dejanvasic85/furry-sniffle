import React from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles, Grid } from '@material-ui/core';

import DashboardItem from './DashboardItem';

import PeopleIcon from '@material-ui/icons/People';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import withApiClient from '../decorators/withApiClient';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

export class DashboardPage extends React.Component {
  state = {
    isFetching: true,
    data: {
      clients: null,
      gifts: null,
      emails: null,
      prospects: null,
    },
  };

  async componentDidMount() {
    const dashboardData = await this.props.api.getDashboard();
    console.log('received', dashboardData);
    this.setState({ data: dashboardData, isFetching: false });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <Paper className={classes.root}>
        <Typography variant="h5">Dashboard</Typography>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <DashboardItem link="/app/clients" title="Clients " icon={<PeopleIcon />} data={data.clients} />
          </Grid>
          <Grid item xs={6}>
            <DashboardItem link="/app/gifts"  icon={<CardGiftcardIcon />} title="Gifts Sent" data={data.gifts} />
          </Grid>
          <Grid item xs={6}>
            <DashboardItem link="/app/clients"  icon={<EmailIcon />} title="Emails Sent" data={data.emails} />
          </Grid>
          <Grid item xs={6}>
            <DashboardItem  link="/app/prospects" icon={<PhoneIcon />} title="Prospects Received" data={data.prospects} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);
