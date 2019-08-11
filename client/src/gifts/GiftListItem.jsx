import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Typography, ListItemIcon, Chip } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '../components/Button';

import { Currency, DateDisplay } from '../components';

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
  },
});

export class GiftListItem extends React.Component {
  render() {
    const { classes, giftDetails, onRefreshStatus, isRefreshInProgress } = this.props;
    return (
      <ListItem alignItems="center" className={classes.root}>
        <ListItemIcon onClick={this.props.onClick} className={classes.value}>
          <Typography variant="h6">
            <Currency baseAmount={giftDetails.value} />
          </Typography>
        </ListItemIcon>
        <div className={classes.statusDiv}>
          <Chip label={giftDetails.status} className={classes.statusChip} />
          <Button variant="outlined" isFetching={isRefreshInProgress} color="secondary" onClick={onRefreshStatus}>
            <RefreshIcon />
          </Button>
        </div>
        <ListItemText>
          <div className={classes.item}>
            <Typography>{giftDetails.message}</Typography>
            <Typography>
              <DateDisplay date={giftDetails.createdAt} />
            </Typography>
          </div>
        </ListItemText>
      </ListItem>
    );
  }
}

GiftListItem.propTypes = {
  giftDetails: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRefreshStatus: PropTypes.func.isRequired,
  isRefreshInProgress: PropTypes.bool
};

export default withStyles(styles)(GiftListItem);
