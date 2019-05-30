import React, { Fragment } from 'react';
import { compose } from 'recompose';
import { Paper, Typography, withStyles, Grid, Divider } from '@material-ui/core';

import PeopleIcon from '@material-ui/icons/People';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';


import DashboardItem from './DashboardItem';
import withApiClient from '../decorators/withApiClient';
import DashboardProspectListItem from '../prospects/DashboardProspectListItem';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  prospects:{
    marginTop:"12px",
    marginBottom:"8px"
  }
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
    newPropsects:[]
  };

  async componentDidMount() {

    const result = await Promise.all([
      this.props.api.getDashboard(),
      this.props.api.getNewProspects()
    ]);

    console.log('received', result);

    this.setState({ data: result[0], newPropsects: result[1], isFetching: false });
  }

  render() {
    const { classes } = this.props;
    const { data, newPropsects } = this.state;

    return (
      <Fragment>
        <Paper className={classes.root}>
         <Typography variant="h5">Complete Signup</Typography>

       </Paper>
       {!!newPropsects.length &&
       <Paper className={classes.root}>
         <Typography variant="h5">New Prospects</Typography>
            <div className={classes.prospects}></div>
            {newPropsects.map(prospect => (
              <div >
                <DashboardProspectListItem key={prospect.id} prospect={prospect} />
                <Divider className={classes.prospects}></Divider>
              </div>
            ))}  
       </Paper>
       }
      <Paper className={classes.root}>
        <Typography variant="h5">Overview</Typography>
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

       </Fragment>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);
