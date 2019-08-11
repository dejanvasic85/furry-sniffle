import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Chip, Grid } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import Avatar from '@material-ui/core/Avatar';
import { Currency, DateDisplay } from '../components';
import IconButton from '@material-ui/core/IconButton';
import PersonAvatar from '../components/PersonAvatar';

const styles = theme => ({
  value: {
    cursor: 'pointer',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  inline: {
    display: 'inline',
  },

  statusChip: {
    backgroundColor: green['200'],
    color: '#fff',
  },

  statusDiv: {
    display: 'flex',
    alignItems: 'center',
  },
});

export class GiftListItem extends React.Component {
  render() {
    const { classes, giftDetails, onRefreshStatus, isRefreshInProgress } = this.props;

    const createdAt = format(giftDetails.createdAt, 'Do MMM YYYY H:mA');
    const updatedAt = format(giftDetails.updatedAt, 'Do MMM YYYY H:mA');
    const message = '';
    return (
      <Grid container  noWrap justify="center" alignItems="center">
        <Grid item xs={1}>
          <Typography variant="h6">
            <Currency baseAmount={giftDetails.value} />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.statusDiv}>
            <IconButton className={classes.button} onClick={onRefreshStatus} color="primary">
              <RefreshIcon />
            </IconButton>

            <Typography variant="body2">{giftDetails.status}</Typography>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Typography noWrap variant="subtitle2">{giftDetails.message}</Typography>
          {/* <Typography variant="body2">{prospect.phone}</Typography>
            <Typography variant="body2">{prospect.email}</Typography> */}
        </Grid>
        <Grid item xs={1}>
          <PersonAvatar details={giftDetails.Client} />
        </Grid>
        <Grid item xs={3}>
          <Link to={`/app/clients/${giftDetails.clientId}`} style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle2">
              {giftDetails.Client.firstName} {giftDetails.Client.lastName}
            </Typography>
            <Typography variant="caption">on {createdAt}</Typography>
          </Link>
        </Grid>
      </Grid>

      // <ListItem alignItems="center" className={classes.root}>
      //   <ListItemIcon onClick={this.props.onClick} className={classes.value}>
      //     <Typography variant="h6">
      //       <Currency baseAmount={giftDetails.value} />
      //     </Typography>
      //   </ListItemIcon>
      //   <div className={classes.statusDiv}>
      //     <Chip label={giftDetails.status} className={classes.statusChip} />
      //     <Button variant="outlined" isFetching={isRefreshInProgress} color="secondary" onClick={onRefreshStatus}>
      //       <RefreshIcon />
      //     </Button>
      //   </div>
      //   <ListItemText>
      //     <div className={classes.item}>
      //       <Typography>{giftDetails.message}</Typography>
      //       <Typography>
      //         <DateDisplay date={giftDetails.createdAt} />
      //       </Typography>
      //     </div>
      //   </ListItemText>
      // </ListItem>
    );
  }
}

GiftListItem.propTypes = {
  giftDetails: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRefreshStatus: PropTypes.func.isRequired,
  isRefreshInProgress: PropTypes.bool,
};

export default withStyles(styles)(GiftListItem);
