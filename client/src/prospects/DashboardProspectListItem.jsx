import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PersonAvatar from '../components/PersonAvatar';
import Avatar from '@material-ui/core/Avatar';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: purple['600'],
    color: '#fff',
    marginRight: '20px',
  },
});

export class DashboardProspectListItem extends React.Component {
  render() {
    const { classes, prospect } = this.props;
    const createdAt = format(prospect.createdAt, 'Do MMM YYYY H:mA');

    return (
      <Grid container spacing="0" justify="center" alignItems="center">
        <Grid item xs={1}>
          <Avatar className={classes.avatar}>
            <QuestionAnswerIcon />
          </Avatar>
        </Grid>
        <Grid item xs={4}>
          <Link to={`/app/prospects/${prospect.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle2">
              {prospect.firstName} {prospect.lastName}
            </Typography>
            <Typography variant="body2">{prospect.phone}</Typography>
            <Typography variant="body2">{prospect.email}</Typography>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">referred by</Typography>
        </Grid>
        <Grid item xs={1}>
          <PersonAvatar details={prospect.Client} />
        </Grid>
        <Grid item xs={3}>
          <Link to={`/app/clients/${prospect.Client.id}`}  style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle2">
              {prospect.Client.firstName} {prospect.Client.lastName}
            </Typography>
            <Typography variant="caption">on {createdAt}</Typography>
          </Link>    
        </Grid>
      </Grid>
    );
  }
}

DashboardProspectListItem.propTypes = {
  prospect: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardProspectListItem);
