import React, { Fragment } from 'react';
import { compose } from 'recompose';
import {
  Paper,
  Typography,
  withStyles,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';

import PeopleIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import DashboardItem from './DashboardItem';
import withApiClient from '../decorators/withApiClient';
import RawProspectList from '../prospects/RawProspectList';
import AgentProgress from './AgentProgress';

const styles = theme => ({
  section: {
    padding: theme.spacing.unit * 2,
    marginTop: '10px'
  },
  prospects: {
    marginTop: '12px',
    marginBottom: '8px'
  }
});

export class DashboardPage extends React.Component {
  state = {
    isFetching: true,
    days: 7,
    data: {
      agent: {},
      clients: null,
      gifts: null,
      emails: null,
      prospects: null
    },
    newProspects: []
  };

  async componentDidMount() {
    const result = await Promise.all([
      this.props.api.getDashboard(this.state.days),
      this.props.api.getNewProspects()
    ]);

    this.setState({ data: result[0], newProspects: result[1], isFetching: false });
  }

  handleDaysChange = async event => {
    const days = Number.parseInt(event.target.value);
    this.setState({ days: days, isFetching: true });
    const dashboardData = await this.props.api.getDashboard(days);
    this.setState({ data: dashboardData, isFetching: false });
  };

  render() {
    const { classes } = this.props;
    const { data, newProspects, days } = this.state;

    return (
      <Fragment>
        <Paper className={classes.section}>
          <Typography variant="h5">Progress</Typography>
          <AgentProgress agent={data.agent} clients={data.clients} />
        </Paper>
        {newProspects.length > 0 && (
          <Paper className={classes.section}>
            <Typography variant="h5">New Prospects</Typography>
            <div className={classes.prospects} />
            <RawProspectList prospects={newProspects} />
          </Paper>
        )}
        <Paper className={classes.section}>
          <Typography variant="h5">Overview</Typography>

          <RadioGroup
            aria-label="position"
            name="position"
            value={String(days)}
            onChange={this.handleDaysChange}
            row>
            <FormControlLabel
              value="7"
              control={<Radio color="primary" />}
              label="Last 7 Days"
              labelPlacement="end"
            />
            <FormControlLabel
              value="30"
              control={<Radio color="primary" />}
              label="Last 30 Days"
              labelPlacement="end"
            />
            <FormControlLabel
              value="90"
              control={<Radio color="primary" />}
              label="Last 90 Days"
              labelPlacement="end"
            />
          </RadioGroup>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <DashboardItem
                link="/app/clients"
                title="Clients "
                icon={<PeopleIcon />}
                data={data.clients}
              />
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
              <DashboardItem
                link="/app/clients"
                icon={<EmailIcon />}
                title="Emails Sent"
                data={data.emails}
              />
            </Grid>

            <Grid item xs={6}>
              <DashboardItem
                link="/app/clients"
                icon={<EmailIcon />}
                title="Emails Opened"
                data={data.emailsOpened}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.section}>
          <Fragment>
            <Typography variant="h5">How does this all work?</Typography>
            <List>
              <ListItem>
                <ListItemText>We create a unique page for each client</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>We send an email to each client with your detail</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Your client does a super job in sharing their link to a prospect
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText>
                  Prospect visits the page and fills out the form and you have a Prospect!
                </ListItemText>
              </ListItem>
            </List>
          </Fragment>
        </Paper>
      </Fragment>
    );
  }
}

export default compose(
  withApiClient,
  withStyles(styles)
)(DashboardPage);
