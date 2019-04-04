import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  wrapper: {
    position: 'relative'
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
});

const ProgressButton = props => {
  const { classes, isFetching, children, ...restProps } = props;
  return <div className={classes.wrapper}>
    <Button disabled={isFetching} {...restProps}>
      {children}
    </Button>
    {isFetching && <CircularProgress size={24} className={classes.progress} />}
  </div>
};

ProgressButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default withStyles(styles)(ProgressButton);