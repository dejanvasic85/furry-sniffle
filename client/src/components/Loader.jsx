import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const classes = theme => ({
  root: {
    margin: 'auto',
    width: '44px'
  }
});

const Loader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(classes)(Loader);