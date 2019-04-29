import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    maxWidth: '960px',
    padding: theme.spacing.unit * 2,
    margin: 'auto'
  }
});

export const PageLayout = (props) => {
  const { classes, children } = props;
  return <div className={classes.root}>
    {children}
  </div>
}

export default compose(
  withStyles(styles)
)(PageLayout);

