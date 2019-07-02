import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Typography, ListItemIcon } from '@material-ui/core';

import {
  Currency,
  DateDisplay
} from '../components';

const styles = theme => ({
  root: {
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
});

export class GiftListItem extends React.Component {
  render() {
    const { classes, giftDetails } = this.props;
    return (
      <ListItem alignItems="center" className={classes.root} onClick={this.props.onClick}>
        <ListItemIcon>
          <Typography variant="h6">
            <Currency baseAmount={giftDetails.value} />
          </Typography>
        </ListItemIcon>
        <div>{giftDetails.status}</div>
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
};

export default withStyles(styles)(GiftListItem);
