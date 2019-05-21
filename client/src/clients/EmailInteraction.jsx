import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, withStyles } from '@material-ui/core';

import { blue, teal, deepPurple } from '@material-ui/core/colors';

import EmailIcon from '@material-ui/icons/Email';

import DateDisplay from '../components/DateDisplay';

const classes = theme => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  opened: {
    color: teal[600],
  },
  delivered: {
    color: blue[500],
  },
  sent: {
    color: deepPurple[500],
  },
});

const toInteraction = ({ createdAt, deliveredAt, openedAt }) => {
  if (openedAt) {
    return {
      date: openedAt,
      style: 'opened',
      label: 'Opened',
    };
  }

  if (deliveredAt) {
    return {
      date: deliveredAt,
      style: 'delivered',
      label: 'Delivered',
    };
  }

  return {
    date: createdAt,
    style: 'sent',
    label: 'Sent',
  };
};

export const EmailInteraction = props => {
  const { classes, email } = props;
  const { date, style, label } = toInteraction(email);

  return (
    <ListItem>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText>
        <div className={classes.item}>
          <Typography>Welcome Email</Typography>
          <Typography className={classes[style]}>
            {label} <DateDisplay date={date} />
          </Typography>
        </div>
      </ListItemText>
    </ListItem>
  );
};

export default withStyles(classes)(EmailInteraction);
