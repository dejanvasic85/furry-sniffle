import React from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

import DateDisplay from './DateDisplay';

const classes = theme => ({
  root: {
    display: 'flex'
  },
  opened: {
    border: '1px solid green'
  },
  delivered: {
    border: '1px solid blue'
  },
  sent: {
    border: '1px solid gray'
  }
});

const getDateToDisplay = ({ createdAt, deliveredAt, openedAt }) => {
  if (openedAt) {
    return openedAt;
  }

  if (deliveredAt) {
    return deliveredAt;
  }

  return createdAt;
};

export const EmailInteraction = props => {
  const { classes, email } = props;
  const dateToDisplay = getDateToDisplay(email);

  return <Paper className={classes.root}>
    <div className={classes.icon}>
      <EmailIcon />
    </div>
    <div>
      <Typography><DateDisplay date={dateToDisplay} /></Typography>
    </div>
  </Paper>;
};

export default withStyles(classes)(EmailInteraction);