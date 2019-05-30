import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles, Grid, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

import PeopleIcon from '@material-ui/icons/People';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import DashboardItem from './DashboardItem';
import withApiClient from '../decorators/withApiClient';
import RawProspectList from '../prospects/RawProspectList';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginTop: '10px',
  },
  prospects: {
    marginTop: '12px',
    marginBottom: '8px',
  },
});

export class DashboardPage extends React.Component {
  state = {
    isFetching: true,
    days: 7,
    data: {
      clients: null,
      gifts: null,
      emails: null,
      prospects: null,
    },
    newPropsects: [],
  };

  async componentDidMount() {
    const result = await Promise.all([this.props.api.getDashboard(this.state.days), this.props.api.getNewProspects()]);

    console.log('received', result);

    this.setState({ data: result[0], newPropsects: result[1], isFetching: false });
  }

  handleDaysChange = async(event) => {
    const days = Number.parseInt(event.target.value);
    this.setState({ days: days,  isFetching: true });

    const dashboardData = await this.props.api.getDashboard(days);

    this.setState({ data: dashboardData,  isFetching: false});
  };

  render() {
    const { classes } = this.props;
    const { data, newPropsects, days } = this.state;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Typography variant="h5">Complete Signup</Typography>
        </Paper>
        {!!newPropsects.length && (
          <Paper className={classes.root}>
            <Typography variant="h5">New Prospects</Typography>
            <div className={classes.prospects} />
            <RawProspectList prospects={newPropsects} />
          </Paper>
        )}
        <Paper className={classes.root}>
          {/* <Typography variant="h5">Overview</Typography> */}

          <RadioGroup aria-label="position" name="position" value={days} onChange={this.handleDaysChange} row>
            <FormControlLabel value={7} control={<Radio color="primary" />} label="Last 7 Days" labelPlacement="end" />
            <FormControlLabel
              value={30}
              control={<Radio color="primary" />}
              label="Last 30 Days"
              labelPlacement="end"
            />
            <FormControlLabel
              value={90}
              control={<Radio color="primary" />}
              label="Last 90 Days"
              labelPlacement="end"
            />
          </RadioGroup>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <DashboardItem link="/app/clients" title="Clients " icon={<PeopleIcon />} data={data.clients} />
            </Grid>

            <Grid item xs={6}>
              <DashboardItem
                link="/app/prospects"
                icon={<PhoneIcon />}
                title="Prospects Received"
                data={data.prospects}
              />
            </Grid>
            <Grid item xs={6}>
              <DashboardItem link="/app/clients" icon={<EmailIcon />} title="Emails Sent" data={data.emails} />
            </Grid>

            <Grid item xs={6}>
              <DashboardItem link="/app/clients" icon={<EmailIcon />} title="Emails Opened" data={data.emailsOpened} />
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);
